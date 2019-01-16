import Vue from 'vue'
import App from './App.vue'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// import VueGAPI from 'vue-gapi'

import firebase from '@/scripts/firebaseConfigured'

Vue.config.productionTip = false

Vue.use(ElementUI)

// const apiConfig = {
//   apiKey: 'AIzaSyBtawhXgORQvlP1O6jKIogd6EWZsO773m4',
//   clientId: '384931465912-q9htc2n6ie6qhge47l2n20vvq8pre7mu.apps.googleusercontent.com',
//   discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest'],
//   scope: 'https://www.googleapis.com/auth/gmail.send',
// }

// Vue.use(VueGAPI, apiConfig)

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
    }
  },
})

const firstTime = true
firebase.auth().onAuthStateChanged(user => {
  Vue.prototype.$store.currentUser = user
  
  if (firstTime) {
    new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')    
  }
})
