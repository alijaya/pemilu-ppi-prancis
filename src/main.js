import Vue from 'vue'
import App from './App.vue'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// import VueGAPI from 'vue-gapi'

import firebase from '@/scripts/firebaseConfigured'

Vue.config.productionTip = false

Vue.use(ElementUI)

Vue.prototype.$firebase = firebase
Vue.prototype.$auth = firebase.auth()
Vue.prototype.$db = firebase.firestore()

Vue.prototype.$success = message => {
  Vue.prototype.$message({
    message: message,
    type: 'success'
  })
}

Vue.prototype.$error = message => {
  Vue.prototype.$message({
    message: message,
    type: 'error'
  })
}

Vue.prototype.$store = new Vue({
  data() {
    return {
      currentUser: null,
      userId: null,
      userLoaded: false,
      userData: {},
      userRef: null,
      isLoggedIn: false,
      isRegistered: false,
      isAdmin: false,
    }
  },
  methods: {
    changeUser(user) {
      // reset
      if (this._unsubscribe) {
        this._unsubscribe()
      }
      this._unsubscribe = null
      this.isUserLoaded = false
      this.userId = null
      this.userData = {}
      this.userRef = null
      this.isLoggedIn = false
      this.isRegistered = false
      this.isAdmin = false

      if (this.currentUser && this.currentUser != user) {
        // logout
        this.$emit('userLogout')
      }
      
      this.currentUser = user
      if (this.currentUser) {
        this.isLoggedIn = true
        this.userId = this.currentUser.uid
        const email = this.currentUser.email
        const verifiedUsersRef = this.$db.collection('verified_users')
        const usersRef = this.$db.collection('users')
        const adminsRef = this.$db.collection('admins')
        this.userRef = usersRef.doc(this.userId)

        return this.userRef.get()
        .then(doc => {
          if (doc.exists) {
            this.isRegistered = true
          } else {
            // add new
    
            // get id_verified_users
            return verifiedUsersRef.where('email', '==', email).get()
            .then(query => {
              let id = null
              let data = null
              query.forEach(doc => {
                id = doc.id
                data = doc.data()
              })
    
              if (id) {
                const newUser = {
                  id_verified_users: id,
                  name: data.name,
                  email: data.email,
                  ppi: data.ppi,
                  vote: -1,
                }
                this.isRegistered = true
                return this.userRef.set(newUser)
              } else {
                // is not verified
                this.isRegistered = false
              }
            })
          }
        })
        .then(() => {
          return adminsRef.doc(this.userId).get()
          .then(doc => {
            if (doc.exists) {
              this.isAdmin = true
            }
          })
        })
        .then(() => {
          if (this.isRegistered) {
            this._unsubscribe = this.userRef.onSnapshot(doc => {
              this.userData = doc.data()
              this.isUserLoaded = true
              this.$emit('userLoaded')
            })
          }
        })
      }
    }
  }
})

const firstTime = true
firebase.auth().onAuthStateChanged(user => {
  Vue.prototype.$store.changeUser(user)
  
  if (firstTime) {
    new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')    
  }
})
