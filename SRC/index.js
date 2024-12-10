// Importação de todas as dependencias 
require ('dotenv').config(); // carrega variaveis de ambiente de um arquivo .env
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const db = require('./DB/db');

const routes = require('./ROUTES/routes'); // importa as rotas
const clienteRoutes = require('./ROUTES/clienteroutes') // importa as rotas do cliente controller
const produtoroutes = require('./ROUTES/produtoroutes')
const entregadorroutes = require('./ROUTES/routes')
const pedidoroutes = require('./ROUTES/routes')

const { METHODS } = require('http');

const corsOptions = {
    origin: ['http://localhost:3333', 'https://meudominio.com'], //lista a origens permitidas
    methods: 'GET, POST, PUT, PATCH, DELETE', //Métodos HTTP permitidos
    credentials: true, //permite o envio de cookies

}
const app = express(); //o app irá receber o express e todas as suas dependências

//Middlewares de segurança e utilidades 
app.use(helmet()); //protege a aplicação com headers de segurança 
app.use(cors(corsOptions)); //habilita o CORS
app.use(morgan('dev')); // loga as requisições no console
app.use(express.json()); // converte os dados recebidos para JSON

//servindo arquivos estáticos
app.use(express.static(path.join(__dirname, 'public'))); //pasta de arquivos estáticos  // o path retorna o caminho de forma dinânica 

//rota para servir o home.html como sendo nossa página principal
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, 'pages', 'home.html'))
});

//configuração de rotas
// após declarar nossas rotas, aqui falamos pra nosso app usar elas como referência
app.use('/', routes);

app.use('/', clienteRoutes); //chama a execução da rota
app.use('/', produtoroutes);
app.use('/', entregadorroutes);
app.use('/', pedidoroutes);

//Middleware de tratamento de erros
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo deu errado!');
});

//Inicialização do servidor
//aqui definimos quem irá escutar nosso chamado e nos responder
const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});