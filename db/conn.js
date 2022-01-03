const mongoose = require('mongoose')

async function main() {
    const connect = await mongoose.connect(`mongodb+srv://admin:86042781sa@sistema.jensb.mongodb.net/sistema?retryWrites=true&w=majority`)
    return connect
}

module.exports = { main }