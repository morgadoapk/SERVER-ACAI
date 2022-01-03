const { verify } = require('jsonwebtoken')

function valideToken(token) {
    try {
        verify(token, process.env.SECRET)
        return true
    } catch (error) {
        return false
    }
}

module.exports = valideToken