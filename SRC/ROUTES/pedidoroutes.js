const express = require('express');
const router = express.Router();  
const pedidoController = require('../CONTROLLER/pedidocontroller'); 


router.get('/pedidos', pedidoController.listarPedidos);
router.get('/pedidos/:idPedido', pedidoController.listarPedidosID);
router.post('/pedidos', pedidoController.adicionarPedido);
router.put('/pedidos/:idPedido', pedidoController.atualizarPedido);
router.delete('/pedidos/:idPedido', pedidoController.deletarPedido);

module.exports = router;
