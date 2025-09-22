require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
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
