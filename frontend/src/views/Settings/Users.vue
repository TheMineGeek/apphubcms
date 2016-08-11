<template>
  <div class="row">
    <h1>Utilisateurs</h1>
  </div>

  <div class="row">
    <a class="waves-effect waves-light btn left"><i class="material-icons left">add</i>Créer un utilisateur</a>
  </div>
  <div class="row">
    <table class="bordered highlight responsive-table" id="userTable">
      <thead>
        <tr>
          <th data-field="id">Username</th>
          <th data-field="name">Display Name</th>
          <th data-field="price">Email</th>
          <th data-field="verified">Verified</th>
          <th data-field="actions">Actions</th>
        </tr>
      </thead>

      <tbody>
      </tbody>
    </table>
  </div>
</template>

<script>
$.ajax({
  crossDomain: true,
  type: 'GET',
  headers: {
    "Authorization": "Bearer " + localStorage.token
  },
  url: 'https://localhost:3000/users',
  success: (e) => {
    console.log(e)
    initTable(e)
  },
  error: function(e) {
    if(e.status == 401) {
      
    }
  }
})

function initTable(users) {
  let table = $('#userTable').find('tbody')[0]
  console.log(table)
  for(let i = 0; i < users.length; i++) {
    let j = i+1
    let html = html = `<tr>
                  <td >${users[i].username}</td>
                  <td>${users[i].displayName}</td>
                  <td>${users[i].email.mail}</td>`
    if(users[i].email.verified) {
      html += `<td><i class="green-text">&#10004;</i></td><td></td>`
    } else {      
      html += `<td><i class="red-text">&#10008;</i></td>
               <td><a class="waves-effect waves-light btn left">Valider le compte</a></td>`
    }
    html += `</tr>`
    table.innerHTML += html
  }
}
</script>

<style>
  table {
    cursor: pointer
  }
</style>