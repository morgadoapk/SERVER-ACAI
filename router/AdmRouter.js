const Router = require('express').Router()

const AdmController = require('../controller/AdmController')
const valideAuthAdm = require('../utils/valide-auth-adm')
const valideAuth = require('../utils/valide-auth')

Router.post('/addnota',             valideAuthAdm, AdmController.add)
Router.get('/readnota',             valideAuthAdm, AdmController.read)
Router.post('/addcardapio',         valideAuthAdm, AdmController.addCardapio)
Router.get('/getcardapios',         valideAuthAdm, AdmController.getCardapios)
Router.get('/getcontascadastradas', valideAuthAdm, AdmController.getContasCadastradas)
Router.get('/getquentinhas',        valideAuthAdm, AdmController.getQuentinhas)
Router.get('/infoquentinha',        valideAuth, AdmController.getInfoQuentinhas)
Router.get('/getcardapiodia',       valideAuth, AdmController.getCardapioDia)
Router.get('/getquentinhasdodia',   valideAuthAdm, AdmController.getQuentinhasdoDia)

module.exports = Router