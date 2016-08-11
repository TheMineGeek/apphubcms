<template>
  <nav class="blue accent-2">
    <div class="nav-wrapper">
      <a href="#" class="brand-logo">Accueil</a>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li><a v-link="{ path : '/login' }" v-if="!authenticated">Connexion</a></li>
        <li><a v-link="{ path : '/signin' }" v-if="!authenticated">S'inscrire</a></li>
      </ul>
    </div>
  </nav>
  <router-view></router-view>
</template>

<script>
  import Auth from '../services/auth'
  export default {
    data() {
      return {
        authenticated: Auth.user.authenticated
      }
    }
  }
</script>