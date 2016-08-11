import Vue from 'vue'
import VueRouter from 'vue-router'
import sha256 from 'js-sha256'
import Auth from './services/auth'

import Home from './views/Home.vue'
import Navbar from './views/Navbar.vue'
import Login from './views/Login.vue'
import Signin from './views/Signin.vue'
import SettingsNavbar from './views/Settings/Navbar.vue'
import SettingsUsers from './views/Settings/Users.vue'

import App from './App.vue'

var router;

$.sha256 = sha256

Vue.use(VueRouter)

router = new VueRouter({
  history: false,
  hashbang: false,
  root: '/'
})

router.map({
  '/home': {
    component: Home,
    auth: true
  },
  '/login': {
    component: Login,
    auth: false
  },
  '/signin': {
    component: Signin,
    auth: false
  },
  '/settings': {
    component: SettingsNavbar,
    subRoutes: {
      '/users': {
        component: SettingsUsers,
        name: 'usersSettings'
      }
    }
  }
})

router.redirect({
  '*': '/settings'
})

/*router.beforeEach(function (transition) {
  if (transition.to.auth && !Auth.user.authenticated) {
    transition.redirect('/login')
  } else if (!transition.to.auth && Auth.user.authenticated) {
    transition.redirect('/home')
  } else {
    transition.next()
  }
})*/

router.start(App, '#app')
Auth.checkLocalStorage()
console.log(Auth.user.authenticated)