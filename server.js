require('dotenv').config()

const express = require('express')
const cors = require('cors')
const path = require('path')
const helmet = require('helmet') // << ADICIONADO

const app = express()

// CORS e segurança
app.use(cors())

// Helmet com configuração personalizada de CSP
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", 'https:'],
      imgSrc: ["'self'", 'data:', 'https:'], // permite favicon e imagens externas seguras
      connectSrc: ["'self'"],
      fontSrc: ["'self'", 'https:'],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  })
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Rota estática
app.use('/app', express.static(path.join(__dirname, '/public')))

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
})
