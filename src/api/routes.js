const express = require('express');
const router = express.Router();
const WebHook = require('./webhook');
const ManagerApi = require('./managerApi')
const webhook = new WebHook();
const managerApi = new ManagerApi()

router.post('/v1/ecommerce/api/instaleap/pedidos', (req, res) => {
    webhook.statusPedido(req, res);
})

router.get('/v1/ecommerce/api/ecommerce/getmargem', (req, res) => {
    managerApi.getMargem(req, res);
})

router.post('/v1/ecommerce/api/ecommerce/setmargem', (req, res) => {
    managerApi.setMargem(req, res);
})

router.post('/v1/ecommerce/api/ecommerce/clientes', (req, res) => {
    webhook.getClientes(req, res);
})


module.exports = router