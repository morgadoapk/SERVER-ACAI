const { verify } = require("jsonwebtoken");

function decodedToken(token) {
    const decoded = verify(token, process.env.SECRET)
    return decoded
}

module.exports = decodedToken