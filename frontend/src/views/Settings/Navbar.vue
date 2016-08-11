<template>
  <div class="row">
    <div class="grey lighten-4 z-depth-3 col m2">
      <ul class="side-nav fixed">
        <li><a class="waves-effect waves-teal">Aperçu<i class="material-icons">dashboard</i></a></li>
        <li><a class="waves-effect waves-teal" v-link="{ name : 'usersSettings' }">Utilisateurs<i class="material-icons">supervisor_account</i></a></li>
        <li><a class="waves-effect waves-teal">Paramètres<i class="material-icons">settings</i></a></li>
      </ul>
    </div>

    <div class=" white col m10">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
  import Auth from '../../services/auth'
  export default {
    /*route: {
      canActivate() {
        return Auth.user.authenticated
      }
    }*/
  }
</script>
<style>

</style>