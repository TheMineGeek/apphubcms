<template>
    <div id="signin" class="row">
        <form class="col offset-s4 s4 grey lighten-5 z-depth-3">
            <div class="row center">
                <h3>S'INSCRIRE</h3>
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
                <div class="col offset-s4 s4">
                    <button class="btn waves-effect waves-light" type="submit" name="action">S'inscrire</button>
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
    #signin {
        margin-top: 35px;
    }
</style>