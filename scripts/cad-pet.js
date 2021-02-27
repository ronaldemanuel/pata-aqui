function validar() {
    var txtNome = document.getElementById("nome")
    var txtRaca = document.getElementById("raca")
    var sex = document.getElementsByName("sx")
    var vacinado = document.getElementsByName("opc")

    var sx = false
    if (sex[0].checked == true || sex[1].checked == true) {
        sx = true
    }

    var vac = false
    if (vacinado[0].checked == true || vacinado[1].checked == true || vacinado[2].checked == true) {
        vac = true
    }

    if (txtNome.value == "" || txtRaca.value == "" || sx == false || vac == false) {
        alert('Campos obrigatórios*')
    }

    if (txtRaca.value == "negra" || txtRaca.value == "Negra") {
        var sEgg = document.getElementById("sEgg")
        sEgg.innerHTML = `<a href="https://www.youtube.com/watch?v=lxNd6LRi-PQ">Clique aqui</a>`
    }

}
