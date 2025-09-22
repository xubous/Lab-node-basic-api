require('dotenv').config()

const express = require('express')
const cors = require('cors')
const path = require('path')

const app = express()
const apiRouter = express.Router()
const endpoint = '/'

const lista_produtos = {
  produtos: [
    { id: 1, descricao: "Produto 1", valor: 5.00, marca: "marca" },
    { id: 2, descricao: "Produto 2", valor: 5.00, marca: "marca" },
    { id: 3, descricao: "Produto 3", valor: 5.00, marca: "marca" },
  ]
}

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Serve os arquivos estáticos na rota /app
app.use('/app', express.static(path.join(__dirname, '/public')))

// Registra as rotas da API
apiRouter.get(endpoint + 'produtos', (req, res) => {
  res.status(200).json(lista_produtos)
})
app.use('/api', apiRouter) // <-- importante!

// Redireciona / para /app
app.get('/', (req, res) => {
  res.redirect('/app')
})

// Serve favicon
app.use('/favicon.ico', express.static(path.join(__dirname, 'public', 'favicon.ico')))

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
})
