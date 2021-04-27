const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Pet = new Schema({
    nome: {
        type: String,
        required: true
    },
    raca: {
        trype: String,
    },
    sexo: {
        type: String,
        required: true
    },
    data_nasc: {
        type: String,
    },
    vacinado: {
        type: String,
        required: true
    }
})

mongoose.model("pets", Pet)