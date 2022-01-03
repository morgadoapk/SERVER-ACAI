const Financeiro = require("../models/Financeiro")
const Cardapio = require('../models/Cardapio')
const User = require('../models/User')
const getDataAtual = require("../utils/get-data")

module.exports = class AdmController {
    static async getQuentinhasdoDia(req, res) {
        const dataAtual = getDataAtual().data.toString()

        try {
            const quentinhas = await Cardapio.findOne({data: dataAtual}).select(['quentinhas', 'data'])

            if(!quentinhas || quentinhas.length === 0) {
                return res.status(404).json (
                    {
                        error: true,
                        message: 'Não há quentinhas cadastradas!',
                        dados: null
                    }
                )    
            }

            return res.status(200).json (
                {
                    error: false,
                    message: 'Quentinhas encontradas com sucesso!',
                    dados: quentinhas
                }
            )
        } catch (error) {
            return res.status(501).json (
                {
                    error: true,
                    message: 'Error no inesperado no servidor!'
                }
            )
        }
    }

    static async getQuentinhas(req, res) {
        try {
            const quentinhas = await Cardapio.find().select(['quentinhas', 'data']).sort('-createdAt')

            if(!quentinhas || quentinhas.length === 0) {
                return res.status(200).json (
                    {
                        error: true,
                        message: 'Não há quentinhas cadastradas!',
                        dados: null
                    }
                )    
            }

            return res.status(200).json (
                {
                    error: false,
                    message: 'Quentinhas encontradas com sucesso!',
                    dados: quentinhas
                }
            )
        } catch (error) {
            return res.status(501).json (
                {
                    error: true,
                    message: 'Error no inesperado no servidor!'
                }
            )
        }
    }

    static async getContasCadastradas(req, res) {
        const getContas = await User.find({})

        if(!getContas) {
            return res.status(422).json (
                {
                    error: true,
                    message: 'Não há contas registradas!'
                }
            )
        }

        return res.status(200).json (
            {
                error: false,
                message: 'Contas encontradas com sucesso!',
                dados: getContas
            }
        )
    }

    static async getCardapios(req, res) {
        const cardapios = await Cardapio.find({}).sort('-createdAt')

        if(!cardapios || cardapios.length === 0) {
            return res.status(422).json (
                {
                    error: true,
                    message: 'Não há cadapios cadastrados!'
                }
            )
        }

        return res.status(200).json (
            {
                error: false,
                message: 'Cardapios encontrados!',
                dados: cardapios
            }
        )
    }

    static async getCardapioDia(req, res) {
        const dataAtual = getDataAtual().data.toString()

        await main().then(async()=>{
            const cardapio = await Cardapio.findOne({data: dataAtual}).select(['-quentinhas', '-createdAt', '-updatedAt', '-__v'])
    
            if(!cardapio || cardapio.length === 0) {
                return res.status(422).json (
                    {
                        error: true,
                        message: `Aguardando o cardápio... ( atualize a pagina para verificar novamente )`
                    }
                )
            }
    
            return res.status(200).json (
                {
                    error: false,
                    message: 'Cardapios encontrados!',
                    dados: cardapio
                }
            )
        })
    }

    static async addCardapio(req, res) {

        const { proteina } = req.body
        let { extra, salada, arroz, macarrao, feijao } = req.body

        if(!proteina) {
            return res.status(422).json (
                {
                    error: true,
                    message: 'Proteina é obrigatorio para cadastrar o almoço!'
                }
            )
        }

        if(!salada) {
            salada = ['Salada', 'Salada vinagrete', 'Salada mista']
        }

        if(!arroz) {
            arroz = ['Arroz', 'Arroz branco', 'Arroz temperado', 'Arroz integral']
        }

        if(!macarrao) {
            macarrao = ['Macarrão', 'Macarrão alho e óleo', 'Macarrão parafuso']
        }

        if(!feijao) {
            feijao = ['Feijão', 'Feijão d/ caldo', 'Feijão tropeiro']
        }

        if(!extra) {
            extra = '.'            
        }

        const dataAtual = getDataAtual().data.toString()

        const newCardapio = await new Cardapio (
            {
                proteina,
                feijao,
                arroz,
                macarrao,
                salada,
                extra,
                data: dataAtual
            }
        )

        try {
            await newCardapio.save()

            return res.status(201).json (
                {
                    error: false,
                    message: 'Almoço cadastrado com sucesso!'
                }
            )
        } catch (error) {
            return res.status(501).json (
                {
                    error: true,
                    message: 'Error inesperado ao "CADASTRAR CARDAPIO" no servidor. tente novamente mais tarde!'
                }
            )
        }
    }

    static async add(req, res) {
        const { pass, nome, valor, tipo } = req.body
        let { descricao, data } = req.body

        if(!tipo) {
            return res.status(422).json (
                {
                    error: true,
                    message: 'Qual o tipo da nota? Ganho ou Despesa?'
                }
            )
        }

        if(tipo !== 'Ganho' && tipo !== 'Despesa') {
            return res.status(422).json (
                {
                    error: true,
                    message: 'Selecione Ganho ou despesa!'
                }
            )
        }

        if(!pass) {
            return res.status(401).json (
                {
                    error: true,
                    message: 'Nao autorizado.'
                }
            )
        }

        if(pass !== 'Pass_Acai') {
            return res.status(401).json (
                {
                    error: true,
                    message: 'Token invalido!'
                }
            )
        }

        if(!nome) {
            return res.status(422).json (
                {
                    error: true,
                    message: 'Nome da nota obrigatoria!'
                }
            )
        }

        if(!valor) {
            return res.status(422).json (
                {
                    error: true,
                    message: 'Valor e obrigatorio!'
                }
            )
        }

        if(!data) {
            const dataAtual = getDataAtual().data.toString()
            data = dataAtual
        }

        if(!descricao) {
            descricao = 'Sem descricao...'
        }

        const newFinanc = await new Financeiro({
            nome, valor, descricao, data, tipo
        })

        try {
            await newFinanc.save()
            return res.status(201).json (
                {
                    error: false,
                    message: 'Adicionado com sucesso!'
                }
            )
        } catch (error) {
            return res.status(501).json (
                {
                    error: false,
                    message: 'Error inesperado no servidor.'
                }
            )
        }
    }

    static async getInfoQuentinhas(req, res) {
        const dataAtual = getDataAtual().data.toString()

        let { data } = req.body
        let quantidadeQuentinhas = 0
        let arrayNomeQuantidade = []

        if(!data || data === '') {
            data = dataAtual
        }

        const getCardapio = await Cardapio.findOne({ data }).sort('-createdAt')

        if(!getCardapio) {
            return res.status(200).json (
                {
                    error: true,
                    message: `Aguardando o cardápio...`
                }
            )         
        }

        await getCardapio.quentinhas.forEach((e, i) => {
            quantidadeQuentinhas += e.quantidade
            arrayNomeQuantidade.push (
                {
                    nome: e.nome, 
                    quantidade: e.quantidade
                }
            )
        })

        return res.status(200).json (
            {
                error: false,
                message: 'Get info com sucesso!',
                dados: {
                    quantidade_quentinhas: quantidadeQuentinhas,
                    infoNomeQuantidade: arrayNomeQuantidade,
                    cardapio: getCardapio.proteina
                }
            }
        )
    }

    static async read(req, res) {
        const todasNotas = await Financeiro.find()

        if(!todasNotas) {
            return res.status(401).json(
                {
                    error: true,
                    message: 'Dados nao encontrados!'
                }
            )
        }

        return res.status(200).json(
            {
                error: false,
                message: 'Dados retornados com sucesso!',
                dados: {
                    todasNotas
                }
            }
        )
    }
}