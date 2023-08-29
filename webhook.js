const api = require('express');
const app = api();
const gerapedidoclass = require('./gerapedido')
const port = 3000;

class WebHook {
    constructor() { }
    async iniciaWebHook() {
        app.use(api.json());
        app.listen(port, () => { console.log(`Rodando na porta:  ${port}`) });

        app.post('/v1/ecommerce/api/instaleap/pedidos', (req, res) => {
            console.log(`Post Recebido de IP:${req.ip}`);
            console.log(req.body['type']);
            switch (req.body['type']) {
                case 'PICKING_FINISHED':
                    res.json({
                        'AVISO': 'PICKING_FINISHED ACEITO'
                    })
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
                    const gerapedido = new gerapedidoclass()
                    gerapedido.gravapedido(numeropedido, itensvalor);
                    break;
                case 'CREATED':
                    res.json({ 'AVISO': 'CREATED ACEITO' })
                    console.log(req.body);
                    break
            }

        })
    }
}

module.exports = WebHook;