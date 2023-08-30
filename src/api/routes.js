const express = require('express');
const router = express.Router();
const WebHook = require('./webhook');
const webhook = new WebHook

router.get('/v1/ecommerce/api/instaleap/pedidos', (req, res) => {
    webhook.statusPedido(req, res);
})

router.get('/v1/ecommerce/api/instaleap/teste', (req, res) => {
    webhook.teste(req, res);
})


module.exports = router