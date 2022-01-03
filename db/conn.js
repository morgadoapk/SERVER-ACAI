const mongoose = require('mongoose')

async function main() {
    const connect = await mongoose.connect(`mongodb+srv://admin:${process.env.SENHA_MONGO}@sistema.jensb.mongodb.net/sistema?retryWrites=true&w=majority`)
    return connect
}

module.exports = { main }