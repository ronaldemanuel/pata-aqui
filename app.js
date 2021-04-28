const express = require("express")
const path = require("path")
const mongoose = require("mongoose")
const handlebars = require("express-handlebars")
require("./modelos/Pet")
const Pet = mongoose.model("pets")
require("./modelos/Usuario")
const Usuario = mongoose.model("usuarios")
const session = require("express-session")
const flash = require("connect-flash")
const app = express()

// CONFIGURAÇÕES
    // Sessão
    app.use(session({
        secret: "123456",
        ressave: true,
        saveUninitialized: true
    }))    
    app.use(flash())

    //Midleware
    app.use((req, res, next) => {
        res.locals.sucesso_msg = req.flash("sucesso_msg")
        res.locals.erro_msg = req.flash("erro_msg")
        next()
    })
    // Body Parser
    app.use(express.urlencoded({extended: true}))
    app.use(express.json())

    // Handlebars
    app.engine('handlebars', handlebars({defaultLayout: "main"}))
    app.set('view engine', 'handlebars')

    // Caminho público
    app.use(express.static(path.join(__dirname, "publico")))

    // MongoDB
    mongoose.Promise = global.Promise
    mongoose.connect("mongodb://localhost/pata_aqui", {
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
        req.flash("erro_msg", "Houve um erro ao listar os pets")
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

    app.post('/cadastro-pet/add', (req, res) => {
        const dados = req.body
        const novoPet = {
            nome: dados.nome,
            raca: dados.raca,
            sexo: dados.sexo,
            data_nasc: dados.dtNasc,
            vacinado: dados.vacinado
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
const PORT = process.env.PORT || 3000
const server = app.listen(PORT, () => {
    console.log("Servidor executando na porta: " + server.address().port)
})