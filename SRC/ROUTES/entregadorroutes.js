const express = require('express');
const router = express.Router();  
const entregadorController = require('../CONTROLLER/entregadorcontroller'); 

router.get('/entregadores', entregadorController.listarEntregador);
router.get('/entregador/:idEntregador', entregadorController.listarEntregadorID);
router.post('/entregador', entregadorController.adicionarEntregador);
router.put('/entregador/:idEntregador', entregadorController.atualizarEntregador);
router.delete('/entregador/:idEntregador', entregadorController.deletarEntregador);

module.exports = router;