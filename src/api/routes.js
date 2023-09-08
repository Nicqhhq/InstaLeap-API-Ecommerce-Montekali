const express = require('express');
const router = express.Router();
const WebHook = require('./webhook');
const webhook = new WebHook

router.post('/v1/ecommerce/api/instaleap/pedidos', (req, res) => {
    webhook.statusPedido(req, res);
})

router.get('/v1/ecommerce/api/ecommerce/getmargem', (req, res) => {
    webhook.getMargem(req, res);
})

router.post('/v1/ecommerce/api/ecommerce/setmargem', (req, res) => {
    webhook.setMargem(req, res);
})

router.post('/v1/ecommerce/api/ecommerce/clientes', (req, res) => {
    webhook.getClientes(req, res);
})


module.exports = router