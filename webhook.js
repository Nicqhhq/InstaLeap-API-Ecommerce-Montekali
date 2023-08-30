const api = require('express');
const app = api();
const gerapedidoclass = require('./gerapedido')
const port = 3000;
const instaleap = require('./HTTPControlers');

app.use(api.json());
app.listen(port, () => { console.log(`Rodando na porta:  ${port}`) });
app.post('/v1/ecommerce/api/instaleap/pedidos', (req, res) => {
    teste(req, res)
})

function teste(req, res) {
    console.log(req.body)
}

class WebHook {
    constructor() { }
    async iniciaWebHook() {
        const gerapedido = new gerapedidoclass()
        var retorno;

        app.post('/v1/ecommerce/api/instaleap/pedidos', (req, res) => {
            console.log(`Post Recebido de IP:${req.ip}`);
            console.log(req.body['type']);
            switch (req.body['type']) {
                case 'PICKING_FINISHED':
                    const itenspedido = [];
                    const itensvalor = [];
                    var objeto = req.body['job']['job_items'];
                    var numeropedido = req.body['job']['declared_value'].toString().replace('.', '')
                    for (const itens in objeto) {
                        if (objeto.hasOwnProperty.call(objeto, itens)) {
                            const produtos = objeto[itens];
                            itenspedido.push(produtos)
                        }
                    }
                    for (const itens in itenspedido) {
                        if (itenspedido.hasOwnProperty.call(itenspedido, itens)) {
                            const produtos = itenspedido[itens];
                            itensvalor.push({ ean: produtos['attributes']['ean'], valor: produtos['attributes']['posPrice'], quantidade: produtos['found_quantity'], unidade: produtos['unit'] })
                        }
                    }
                    retorno = gerapedido.gravapedido(numeropedido, itensvalor);
                    res.json({
                        'AVISO': 'PICKING_FINISHED ACEITO',
                        'NUMERO DO PEDIDO': retorno
                    })
                    break;
                case 'CREATED':
                    var api;
                    var objeto = req.body['job']['origin']['store_reference'];
                    var idjob = req.body['job']['id'];
                    switch (objeto) {
                        case 'MON-002':
                            api = new instaleap('002');
                            break;
                        default:
                            break;
                    }
                    retorno = gerapedido.reservaNumeroPedido();
                    res.json({
                        'AVISO': 'CREATED ACEITO',
                        'NUMERO DO PEDIDO': retorno
                    });
                    api.atualizaNumeracaoPedido(idjob, retorno)
                    break
            }

        })
    }
}

module.exports = WebHook;