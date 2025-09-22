require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');

const app = express();

app.use(cors());

// Helmet com CSP mínimo
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'"],
      imgSrc: ["'self'", 'data:', 'https:'], // Permite favicon
    },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve os arquivos estáticos na rota /app
app.use('/app', express.static(path.join(__dirname, '/public')));

// Redireciona / para /app
app.get('/', (req, res) => {
  res.redirect('/app');
});

// Serve favicon direto, se necessário
app.use('/favicon.ico', express.static(path.join(__dirname, 'public', 'favicon.ico')));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
