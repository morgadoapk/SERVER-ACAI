const decodedToken = require('./decoded-token')
const getToken = require('./get-token')
const valideToken = require('./valide-token')

function valideAuth(req, res, next) {
    const token = getToken(req)

    if(token === false) {
        return res.status(401).json (
            {
                error: true,
                message: 'Acesso negado!'
            }
        )
    }

    if(valideToken(token)) {
        const tokenDecodificado = decodedToken(token).dados.nivel

        if(tokenDecodificado === 0) {
            return res.status(401).json (
                {
                    error: true,
                    message: 'Nivel de acesso negado!'
                }
            ) 
        }

        next()
    } else {
        return res.status(401).json (
            {
                error: true,
                message: 'Token de acesso invalido!'
            }
        )
    }
}

module.exports = valideAuth