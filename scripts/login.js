function validar() {
    var txtEmail = document.getElementById("email")
    var txtSenha = document.getElementById("senha")

    if (txtEmail.value == "" || txtSenha.value == "") {
        alert('Campos obrigatórios*')
    } 
}