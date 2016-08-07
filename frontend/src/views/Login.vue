<template>
  <div id="login" class="row">
    <form class="col offset-s4 s4 grey lighten-5 z-depth-3" id="loginForm" @submit="onSubmit">

      <div class="row">
        <h3 class="center">SE CONNECTER</h3>
      </div>

      <div class="divider grey lighten-3"></div>

      <div class="row" id="errorDisplay" style="display: none;">
        <div class="col s12 m12">
          <div class="card-panel red lighten-1">
            <span class="white-text" id="errorMessage">Nom d'utilisateur ou mot de passe incorrect</span>
            <span class="white-text right unselectable" style="cursor: pointer;">x</span>
          </div>
        </div>
      </div>

      <div class="row" id="validDisplay" style="display: none;">
        <div class="col s12 m12">
          <div class="card-panel green lighten-1">
            <span class="white-text" id="validMessage">Vous êtes bien inscrit</span>
            <span class="white-text right unselectable" style="cursor: pointer;">x</span>
          </div>
        </div>
      </div>

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
        <div class="col offset-s1 offset-m2 offset-l3 s10 m8 l6">
          <button class="btn waves-effect waves-light" type="submit" name="action">Se connecter</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import {router} from '../main.js  '
  export default {
  methods: {
    onSubmit(e) {
      e.preventDefault();
      
      var data = {
        username: $('#username').val(),
        password: $.sha256($('#password').val() + $('#username').val())
      }
      
      var that = this;
      
      $.ajax({
        crossDomain: true,
        type: 'POST',
        headers: {
          "Authorization": "Basic " + btoa(data.username + ":" + data.password)
        },
        url: 'https://localhost:3000/login',
        success: (e) => {
          console.log(e)
          that.$router.auth = true
          that.$router.token = e.token
          that.$router.go('/')
        },
        error: function(e) {
          if(e.status == 401) {
            $("#errorDisplay").show()
              .find('.unselectable').on('click', function() {
                  $('#errorDisplay').hide();
                });
          }
        }
      })
    }
  }
}

</script>

<style>
  #login {
    margin-top: 35px;
  }
  
  .unselectable {
    -webkit-user-select: none;
    /* Chrome/Safari */
    -moz-user-select: none;
    /* Firefox */
    -ms-user-select: none;
    /* IE10+ */
  }
</style>