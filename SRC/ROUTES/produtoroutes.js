const express = require('express')
const router = express.Router();
const produtoController = require('../CONTROLLER/produtocontroller');

router.get('/produtos', produtoController.listarProdutos);
router.get('/produtos/:idProduto', produtoController.listarProdutoID);
router.get('/produto/nome/:nomeProduto', produtoController.buscarProdutoNome);
router.post('/produtos', produtoController.adicionarProduto);
router.put('/produto/:idProduto', produtoController.atualzarProduto)
router.delete('/produto/:idProduto', produtoController.deletarProduto)

module.exports = router;

