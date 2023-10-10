const path = require('path');
const express = require('express');
const router = express.Router();
const WebHook = require('./webhook');
const ManagerApi = require('./managerApi')
const webhook = new WebHook();
const managerApi = new ManagerApi()
const log = require(path.join(__dirname, '..', 'configlogs', 'gravalog.js'))

router.post('/v1/ecommerce/api/instaleap/pedidos', (req, res) => {
    log.gravaLog('Hook recebido do IP: ', req.ip)
    webhook.statusPedido(req, res);
})

router.get('/v1/ecommerce/api/ecommerce/getmargem', (req, res) => {
    log.gravaLog('Hook recebido do IP: ', req.ip, 'Aplicacao de gerenciamento: Leitura Margem')
    managerApi.getMargem(req, res);
})

router.post('/v1/ecommerce/api/ecommerce/setmargem', (req, res) => {
    log.gravaLog('Hook recebido do IP: ', req.ip, 'Aplicacao de gerenciamento: Margem Configurada')
    managerApi.setMargem(req, res);
})

router.post('/v1/ecommerce/api/auth', (req, res) => {
    log.gravaLog('Hook recebido do IP: ', req.ip, 'Aplicacao de gerenciamento: Login')
    webhook.authUser(req, res);
})


module.exports = router