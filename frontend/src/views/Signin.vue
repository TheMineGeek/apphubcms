<template>
  <navbar></navbar>
  <div id="signin" class="row">
    <form class="col offset-s4 s4 grey lighten-5 z-depth-3" @submit="onSubmit" id="signupForm">
      <div class="row center">
        <h3>S'INSCRIRE</h3>
      </div>

      <div class="divider grey lighten-3"></div>

      <div class="row" id="errorDisplay" style="display: none;">
        <div class="col s12 m12">
          <div class="card-panel red lighten-1">
            <span class="white-text" id="errorMessage"></span>
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
          <i class="material-icons prefix">email</i>
          <input placeholder="Mail" id="email" type="text" class="validate" required="required">
          <label for="email">Adresse mail</label>
        </div>
      </div>

      <div class="row">
        <div class="input-field col s5">
          <i class="material-icons prefix">lock</i>
          <input placeholder="Mot de passe" id="password" type="password" class="validate" required="required">
          <label for="password">Mot de passe</label>
        </div>

        <div class="input-field col s5 offset-s1">
          <i class="material-icons prefix">lock</i>
          <input placeholder="Mot de passe" id="cpassword" type="password" class="validate" required="required">
          <label for="cpassword">Confirmer le mot de passe</label>
        </div>
      </div>


      <div class="row">
        <div class="col offset-s1 s10 offset-m2 m8 offset-l4 l4">
          <button id="submitSignup" class="btn waves-effect waves-light col s12" type="submit" name="action">S'inscrire</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import Navbar from './Navbar.vue'
  export default {
    components: { 'navbar' : Navbar },
  methods: {
    onSubmit(e) {      
      e.preventDefault() 
      if($('#password').val() == $('#cpassword').val()) {
        if($('#email').val().match(/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i)) {
          var password = $.sha256($('#password').val() + "_apphubcms")
          var data = {
            username: $('#username').val(),
            password:password,
            email: $('#email').val()
          }
          
          var that = this;
          
          $.ajax({
            data: data,
            crossDomain: true,
            type: 'POST',
            url: 'https://localhost:3000/signup',
            beforeSend: function() {
              $('#validDisplay').hide();
              $('#errorDisplay').hide();
              $('#submitSignup').addClass('disabled');
              $('#signupForm').on('submit', function(e) {
                e.preventDefault();
              });
            },
            success: function(e) {
              $('#signupForm').on('submit', function(e) {});              
              $('#submitSignup').removeClass('disabled');
              if(e.error) {
                $('#errorDisplay').show();
                $('#errorMessage').html(e.message);
                $('#errorDisplay').find('.unselectable').on('click', function() {
                  $('#errorDisplay').hide();
                });
              } else {
                $('#validDisplay').show();
                setTimeout(function() {
                  that.$router.go({
                    path: '/login'
                  })
                }, 1);
                $('#validDisplay').find('.unselectable').on('click', function() {
                  $('#validDisplay').hide();
                });
                $('#errorDisplay').hide();
              }
            }
          })
        } else {
          alert('Problème mail')
        }
      } else {
        alert('Problème mot de passe')
      } 
    }
  }
}

</script>

<style>
  #signin {
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