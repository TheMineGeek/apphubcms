import Vue from 'vue'
import VueRouter from 'vue-router'
//import App from './App.vue'
import Login from './components/Login.vue'
import Signin from './components/Signin.vue'

$(document).ready(function () {
  Materialize.toast("Ready to go !", 4000)

  Vue.use(VueRouter)

  /* eslint-disable no-new */
  /*new Vue({
    el: 'body',
    components: { Login }
  })*/

  var Foo = Vue.extend({
    template: '<p>This is foo!</p>'
  })

  var App = Vue.extend({})

  var router = new VueRouter({
    history: false,
    hashbang: false,
    root: '/'
  })

  console.log(Foo)

  router.map({
    '/login': {
      component: Login
    },
    '/signin': {
      component: Signin
    }
  })

  router.start(App, '#app')
})