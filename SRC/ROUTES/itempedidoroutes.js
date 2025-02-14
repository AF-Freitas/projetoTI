const express = require('express');
const router = express.Router(); 
const itempedidoController = require('../CONTROLLER/itempedidocontroller'); 


router.get('/itempedido', itempedidoController.listarItempedido);

router.get('/itempedido/:idItem', itempedidoController.listarItempedidoId);

router.post('/itempedido', itempedidoController.adicionarItempedido);

router.put('/itempedido/:idItem', itempedidoController.atualizarItempedido);

router.delete('/itempedido/:idItem', itempedidoController.deletarItempedido);

module.exports = router;