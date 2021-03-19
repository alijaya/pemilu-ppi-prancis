import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Result from './views/Result.vue'
import Ridho from './views/Ridho.vue'
import Hazem from './views/Hazem.vue'
import Login from './views/Login.vue'
import VerifyLogin from './views/VerifyLogin.vue'
import User from './views/User.vue'
import Admin from './views/Admin.vue'
import Moderator from './views/Moderator.vue'

import firebase from '@/scripts/firebaseConfigured'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/result',
      name: 'result',
      component: Result
    },
    {
      path: '/ridho',
      name: 'ridho',
      component: Ridho
    },
    {
      path: '/hazem',
      name: 'hazem',
      component: Hazem
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        guest: true
      }
    },
    {
      path: '/verifylogin',
      name: 'verifylogin',
      component: VerifyLogin,
      meta: {
        guest: true
      }
    },
    {
      path: '/user',
      name: 'user',
      component: User,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      meta: {
        requiresAuth: true,
        requiresAdmin: true
      }
    },
    {
      path: '/moderator',
      name: 'moderator',
      component: Moderator,
      meta: {
        requiresAuth: true,
        requiresModerator: true
      }
    },
  ]
})

router.beforeEach((to, from, next) => {
  const store = window.store
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (firebase.auth().currentUser) {
      store.checkUserLoaded()
      .then(() => {
        if (to.matched.some(record => record.meta.requiresAdmin)) {
          if (store.isAdmin) {
            next()
          } else {
            next({ name: 'user' })
          }
        } else if (to.matched.some(record => record.meta.requiresModerator)) {
          if (store.isAdmin || store.isModerator) {
            next()
          } else {
            next({ name: 'user' })
          }
        } else {
          next()
        }
      })
    } else {
      next({
        name: 'login',
        params: { nextUrl: to.fullPath }
      })
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (!firebase.auth().currentUser) {
      next()
    } else {
      next({ name: 'user' })
    }
  } else {
    next()
  }
})

export default router