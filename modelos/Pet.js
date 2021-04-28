const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Pet = new Schema({
    nome: {
        type: String,
        required: true
    },
    raca: String,
    sexo: String,
    data_nasc: String,
    vacinado: {
        type: String,
        required: true
    }
})

mongoose.model("pets", Pet)