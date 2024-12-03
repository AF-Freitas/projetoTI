const express = require('express');
const router = express.Router();

//exemplo de uma rota GET
router.get('/usuario', (req, res) => {
    res.send('Rota do usuário');
});

router.get('/Aline', (req, res) => {
    res.send('Rota Aline');
});

//exporte o roteador para que ee possa ser usado no index.js
module.exports = router;
