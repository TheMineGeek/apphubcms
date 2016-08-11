export default {
  user: {
    authenticated: false
  },

  login(token) {
    localStorage.setItem('token', token)
    this.user.authenticated = true
  },

  logout() {
    localStorage.removeItem('token')
    this.authenticated = false
  },

  checkLocalStorage() {
    var that = this

    if (localStorage.getItem('token')) {
      $.ajax({
        url: 'https://localhost:3000/checkToken',
        data: localStorage.getItem('token'),
        type: 'POST',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        success: function (e) {
          console.log(e)
          if (e) {
            that.authenticated = true
          } else {
            localStorage.removeItem('token')
            that.authenticated = false
          }
        },
        error: function (e) {
          console.log(e)
        }
      })
    }
  }
}