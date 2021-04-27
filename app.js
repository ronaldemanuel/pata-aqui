const express = require("express")
const path = require("path")
const app = express()

// CONFIGURAÇÕES
// Caminho público
app.use(express.static(path.join(__dirname, "publico")))
//

// Rotas
app.get('/', (req, res) => {
    res.render("index")
})

app.get('/sobre', (req, res) => {
    res.sendFile(__dirname + "/publico/paginas/sobre.html")
})

app.get('/login', (req, res) => {
    res.sendFile(__dirname + "/publico/paginas/login.html")
})

app.get('/cadastro-pet', (req, res) => {
    res.sendFile(__dirname + "/publico/paginas/cad-pet.html")
})

app.get('/cadastro-usuario', (req, res) => {
    res.sendFile(__dirname + "/publico/paginas/cad-u.html")
})

app.get

const PORT = process.env.PORT || 3000
const server = app.listen(PORT, () => {
    console.log("Servidor executando na porta: " + server.address().port)
})