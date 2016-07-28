<template>
  <div id="app">
    <login></login>
    <hello></hello>
  </div>
</template>

<script>
import Hello from './components/Hello.vue'
import Login from './components/Login.vue'

export default {
  components: {
    Login,
    Hello
  }
}
</script>