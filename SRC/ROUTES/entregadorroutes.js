const express = require('express');
const router = express.Router();  
const entregadorController = require('../CONTROLLER/entregadorcontroller'); 

router.get('/entregadores', entregadorController.listarEntregador);
router.get('/entregadores/:idEntregador', entregadorController.listarEntregadorID);
router.post('/entregadores', entregadorController.adicionarEntregador);
router.put('/entregadores/:idEntregador', entregadorController.atualizarEntregador);
router.delete('/entregadores/:idEntregador', entregadorController.deletarEntregador);

module.exports = router;