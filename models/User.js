const mongoose = require('../db/conn')
const { Schema } = mongoose

const User = mongoose.model(
    'users', new Schema({
        nome: {
            type: String, 
            required: true
        },
        senha: {
            type: String,
            required: true
        },
        nivel: {
            type: Number,
            required: true
        }
    })
)

module.exports = User