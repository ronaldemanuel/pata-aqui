const express = require("express")
const path = require("path")
const mongoose = require("mongoose")
const multer = require("multer")
const multerConfig = require("./config/multer")
const handlebars = require("express-handlebars")
require("./models/Pet")
const Pet = mongoose.model("pets")
require("./models/Usuario")
const Usuario = mongoose.model("usuarios")
const session = require("express-session")
const flash = require("connect-flash")

const PORT = process.env.PORT || 3000
const DB_URL = "mongodb+srv://user:pata-aqui@cluster-test.jfpsq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

const app = express()

// CONFIGURAÇÕES
    // Body Parser
    app.use(express.urlencoded({extended: true}))
    app.use(express.json())

    // Handlebars
    app.engine('handlebars', handlebars({defaultLayout: "main"}))
    app.set('view engine', 'handlebars')

    // Caminhos públicos
    app.use(express.static(path.join(__dirname, "public")))
    app.use("/imagens-pets", express.static("uploads"))

    // MongoDB
    mongoose.Promise = global.Promise
    mongoose.connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Conectado ao MongoDB.")
    }).catch(err => {
        console.log("Falha ao conectar com MongoDB: " + err)
    })
//

// Rotas
app.get('/', (req, res) => {
    Pet.find().lean().then(pets => {
        res.render("home", {pets: pets})
    }).catch(err => {
        console.log("Erro ao exibir home: " + err)
    })
})

app.get('/sobre', (req, res) => {
    res.render("pages/sobre")
})

app.get('/login', (req, res) => {
    res.render("pages/login")
})

    // Cadastro Pet
    app.get('/cadastro-pet', (req, res) => {
        res.render("pages/cad-pet")
    })

    app.post('/cadastro-pet/add', multer(multerConfig).single("imagem"), (req, res) => {
        const body = req.body
        const file = req.file

        const novoPet = {
            nome: body.nome,
            raca: body.raca,
            sexo: body.sexo,
            idade: body.idade,
            vacinado: body.vacinado,
            imgNome: file.originalname,
            imgSize: file.size,
            imgKey: file.filename
        }

        new Pet(novoPet).save().then(() => {
            console.log("pet cadastrado")
            res.redirect("/")
        }).catch(err => {
            console.log("Erro ao cadastrar pet: " + err)
        })
    })

    // Cadastro usuário
    app.get('/cadastro-usuario', (req, res) => {
        res.render("pages/cad-u")
    })
    
    app.post('/cadastro-usuario/add', (req, res) => {
        const dados = req.body
        const novoUsuario = {
            nome: dados.nome,
            sobrenome: dados.sobrenome,
            cpf: dados.cpf,
            sexo: dados.sexo,
            email: dados.email,
            senha: dados.senha
        }
    
        new Usuario(novoUsuario).save().then(() => {
            console.log("Usuário cadastrado")
            res.redirect("/")
        }).catch(err => {
            console.log("Erro ao cadastrar usuário: " + err)
        })
    })
//
const server = app.listen(PORT, () => {
    console.log("Servidor executando na porta: " + server.address().port)
})