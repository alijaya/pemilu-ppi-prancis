import Vue from 'vue'
import App from './App.vue'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'

// import VueGAPI from 'vue-gapi'

import firebase from '@/scripts/firebaseConfigured'

Vue.config.productionTip = false

Vue.use(ElementUI, { locale })

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
  render: h => h('div'),
  data() {
    return {
      currentUser: null,
      userId: null,
      userLoaded: false,
      userData: {},
      userRef: null,
      isLoadedPromise: false,
      isLoggedIn: false,
      isRegistered: false,
      isAdmin: false,
      isModerator: false,
      controlRef: null,
      dateRange: [Date.now(), Date.now()],
      isLocked: false,
    }
  },
  computed: {
    statusToVote() {
      if (this.isLocked) {
        return 'locked'
      } else if (Date.now() < this.dateRange[0]){
        return 'before'
      } else if (Date.now() > this.dateRange[1]) {
        return 'after'
      } else {
        return 'valid'
      }
    }
  },
  methods: {
    checkUserLoaded() {
      return new Promise(resolve => {
        if (this.isUserLoaded) {
          resolve()
        } else {
          this.$once('userLoaded', resolve)
        }
      })
    },
    setupGlobal() {
      this.controlRef = this.$db.collection('global').doc('control')
      this.controlRef
      .onSnapshot(doc => {
        const data = doc.data()
        this.dateRange = [data.startDate.toDate(), data.endDate.toDate()]
        this.isLocked = data.locked
      })
    },
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
      this.isModerator = false

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
        const moderatorsRef = this.$db.collection('moderators')
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
          return Promise.all([
            adminsRef.doc(this.userId).get()
            .then(doc => {
              if (doc.exists) {
                this.isAdmin = true
                this.isModerator = true
              }
            }),
            moderatorsRef.doc(this.userId).get()
            .then(doc => {
              if (doc.exists) {
                this.isModerator = true
              }
            }),
          ])
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
}).$mount('#store')

window.store = Vue.prototype.$store
window.firebase = firebase

let firstTime = true
firebase.auth().onAuthStateChanged(user => {
  Vue.prototype.$store.changeUser(user)
  
  if (firstTime) {
    firstTime = false
    Vue.prototype.$store.setupGlobal()
    new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')    
  }
})
