const Cardapio = require('../models/Cardapio')
const User = require('../models/User')
const createToken = require('../utils/create-token')
const getDataAtual = require('../utils/get-data')
const getToken = require('../utils/get-token')

const { main } = require('../db/conn')

module.exports = class UserController {
    static async register(req, res) {
        const { nome, senha, confirmsenha } = req.body

        if(!nome) {
            return res.status(422).json (
                {
                    error: true,
                    message: 'O nome é obrigatorio!'
                }
            )
        }

        if(!senha) {
            return res.status(422).json (
                {
                    error: true,
                    message: 'A senha é obrigatoria!'
                }
            )
        }

        if(!confirmsenha) {
            return res.status(422).json (
                {
                    error: true,
                    message: 'Confirme sua senha!'
                }
            )
        }

        if(confirmsenha !== senha) {
            return res.status(422).json (
                {
                    error: true,
                    message: 'As senhas não conferem!'
                }
            )
        }

        const newUser = await new User (
            {
                nome, 
                senha,
                nivel: 0
            }
        )

        try {
            
            await newUser.save()

            return res.status(201).json (
                {
                    error: false,
                    message: 'Conta registrada com sucesso!'
                }
            )

        } catch (error) {
            return res.status(501).json (
                {
                    error: true,
                    message: "Error inesperado no servidor, tente novamente mais tarde!"
                }
            )
        }
    }

    static async login(req, res) {
        const { nome, senha } = req.body
        if(!nome) {
            return res.status(422).json (
                {
                    error: true,
                    message: 'Nome é obrigatório!'
                }
            )           
        }

        if(!senha) {
            return res.status(422).json (
                {
                    error: true,
                    message: 'Senha é obrigatório!'
                }
            )           
        }

        const searchUser = await User.findOne({nome: nome})
        
        if(!searchUser) {
            return res.status(422).json (
                {
                    error: true,
                    message: 'Conta invalida!'
                }
            )
        }

        if(searchUser.senha !== senha) {
            return res.status(422).json (
                {
                    error: true,
                    message: 'Senha invalida!'
                }
            )
        }

        const token = createToken(searchUser)

        return res.status(200).json (
            {
                error: false,
                message: 'Login com sucesso',
                token: token
            }
        )
    }

    static async pedirQuentinhas(req, res) {

        const { quentinhas, nome } = req.body

        if(!nome) {
            return res.status(422).json ( 
                {
                    error: true,
                    message: 'Nome é obrigatório!'
                }
            )
        }

        if(!quentinhas) {
            return res.status(422).json (
                {
                    error: true,
                    message: 'Quentinhas é obrigatória!'
                }
            )
        }

        if(typeof(quentinhas) !== 'object') {
            return res.status(422).json (
                {
                    error: true,
                    message: 'Quentinhas é um objeto!'
                }
            )
        }

        const dataAtual = getDataAtual().data.toString()

        try {

            const quantidade = quentinhas.length

            const verifyQuentinha = await Cardapio.findOne({data: dataAtual})

            if(!verifyQuentinha) {
                return res.status(200).json (
                    {
                        error: false,
                        message: `Aguardando o cardapio de hoje...`,
                    }
                )         
            }

            await Cardapio.updateOne (
                {
                    data: dataAtual
                },
                {
                    $push: {
                        quentinhas: {
                            nome: nome,
                            quantidade: quantidade,
                            quentinhas: quentinhas
                        }
                    }
                }
            )
    
            return res.status(200).json (
                {
                    error: false,
                    message: `PEDIDO ENVIADO!. quantidade: ${quantidade} - data: ${dataAtual}`,
                }
            )
        } catch (error) {
            return res.status(501).json (
                {
                    error: true,
                    message: 'ERROR! inesperado no servidor. Tente novamente mais tarde!'
                }
            )
        }
    }
}