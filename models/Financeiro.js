const mongoose = require('mongoose')
const { Schema } = mongoose

const Financeiro = mongoose.model(
    'financeiro', new Schema({
        nome: {
            type: String, required: true
        },
        data: {
            type: String, required: true
        },
        valor: {
            type: String, required: true
        },
        descricao: {
            type: String
        },
        tipo: {
            type: String, required: true
        }
    })
)

module.exports = Financeiro