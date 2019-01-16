import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import VerifyLogin from './views/VerifyLogin.vue'
import User from './views/User.vue'
import Admin from './views/Admin.vue'

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
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (firebase.auth().currentUser) {
      if (to.matched.some(record => record.meta.requiresAdmin)) {
        const isAdmin = true
        if (isAdmin) {
          next()
        } else {
          next({ name: 'user' })
        }
        next()
      } else {
        next()
      }
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