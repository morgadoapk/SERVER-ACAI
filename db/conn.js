const mongoose = require('mongoose')

async function main() {
    await mongoose.connect(`mongodb+srv://admin:${process.env.SENHA_MONGO}@sistema.jensb.mongodb.net/sistema?retryWrites=true&w=majority`)
}

main().catch(() => {
    console.log('ERROR MONGO')
})

module.exports = mongoose