const Router = require('express').Router()

const UserController = require('../controller/UserController')
const valideAuth = require('../utils/valide-auth')
const valideAuthAdm = require('../utils/valide-auth-adm')

Router.post('/register', valideAuthAdm, UserController.register)
Router.post('/login', UserController.login)
Router.post('/pedir', valideAuth, UserController.pedirQuentinhas)

module.exports = Router