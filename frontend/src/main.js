import Vue from 'vue'
import VueRouter from 'vue-router'
import sha256 from 'js-sha256'

var App = Vue.extend({})

var router;

$(document).ready(function () {
  $.sha256 = sha256
  
  Vue.use(VueRouter)

  router = new VueRouter({
    history: false,
    hashbang: false,
    root: '/'
  })

  /* eslint-disable no-new */
  /*new Vue({
    el: 'body',
    components: { Login }
  })*/

  router.map({
    '/': {
      component: require('./views/Home.vue'),
      auth: true
    },
    '/login': {
      component: require('./views/Login.vue'),
      auth: false
    },
    '/signin': {
      component: require('./views/Signin.vue'),
      auth: false
    },
    '/settings': {
      component: require('./views/Settings/Navbar.vue'),
      auth: true
    }
  })
  
  router.beforeEach(function(transition) {
    if(transition.to.auth) {
      transition.redirect('/login')
    } else {
      transition.next()
    }
  })

  router.start(App, '#app')
})