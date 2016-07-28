<template>
  <div id="login" class="row">
    <form class="col offset-s4 s4 grey lighten-5 z-depth-3" id="loginForm">

      <div class="row">
        <h3 class="center">SE CONNECTER</h3>
      </div>

      <div class="divider grey lighten-3"></div>

      <div class="row">
        <div class="input-field col s10">
          <i class="material-icons prefix">account_circle</i>
          <input placeholder="Nom d'utilisateur" id="username" type="text" class="validate" required="required">
          <label for="username">Nom d'utilisateur</label>
        </div>
      </div>

      <div class="row">
        <div class="input-field col s10">
          <i class="material-icons prefix">lock</i>
          <input placeholder="Mot de passe" id="password" type="password" class="validate" required="required">
          <label for="password">Mot de passe</label>
        </div>
      </div>

      <div class="row">
        <div class="col offset-s1">
          <p>
            <input type="checkbox" class="filled-in" id="filled-in-box" checked="checked" />
            <label for="filled-in-box">Se souvenir de moi</label>
          </p>
        </div>
      </div>

      <div class="row">
        <div class="col offset-s4 s4">
          <button class="btn waves-effect waves-light" type="submit" name="action">Se connecter</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Hello!'
    }
  }
}
</script>

<style>
    #login {
        margin-top: 35px;
    }
</style>