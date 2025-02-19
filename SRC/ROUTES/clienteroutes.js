const express = require('express');
const router = express.Router();  // rotiamento, distibuição das rotas
const clienteController = require('../CONTROLLER/clientecontroller'); // Importa o controller de clientes

//Rota para listar todos os clientes
router.get('/clientes', clienteController.listarClientes);

//Rota para buscar clientes por CPF
router.get('/clientes/:cpf', clienteController.listarClienteCPF);

//Rota para adicionar um novo cliente
router.post('/clientes', clienteController.adicionarCliente);

//Rota para atualizar um cliente por CPF
router.put('/clientes/:cpf', clienteController.atualizarCliente);

//Rota para deleter um cliente por CPF
router.delete('/clientes/:cpf', clienteController.deletarCliente);

module.exports = router;


