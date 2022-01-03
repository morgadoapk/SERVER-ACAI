const { sign } = require('jsonwebtoken')

function createToken(dados) {
    const token = sign({dados}, process.env.SECRET)
    return token
}

module.exports = createToken