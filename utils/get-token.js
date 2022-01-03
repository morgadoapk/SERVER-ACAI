function getToken(req) {

    if(!req.headers.authorization) {
        return false
    }

    const header = req.headers.authorization
    const token = header.split(' ')[1]

    return token
}

module.exports = getToken