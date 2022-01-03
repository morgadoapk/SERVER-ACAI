const mongoose = require('mongoose')
const { Schema } = mongoose

const Cardapio = mongoose.model(
    'cardapio_do_dia', new Schema({
        proteina: {
            type: Array,
            required: true
        },
        salada: {
            type: Array, 
            required: true
        },
        arroz: {
            type: Array,
            required: true
        },
        macarrao: {
            type: Array,
            required: true
        },
        feijao: {
            type: Array,
            required: true
        },
        extra: {
            type: Array,
            required: true
        },
        data: {
            type: String,
            required: true
        },
        quentinhas: {
            type: Array
        }
    }, { timestamps: true })       
)

module.exports = Cardapio