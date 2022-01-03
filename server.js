const express = require('express')
const cors = require('cors')
require('dotenv').config()

const port = process.env.PORT || 5000

const app = express()
app.use(express.json())

app.use
( 
    cors ( 
        { 
            credentials: true, 
            origin: 'https://acai-painel.vercel.app'
        } 
    ) 
)

app.use(express.json())

// rotas
const RouterAdm = require('./router/AdmRouter')
const RouterUser = require('./router/UserRouter')

app.use('/adm', RouterAdm)
app.use('/user', RouterUser)

app.listen(port)