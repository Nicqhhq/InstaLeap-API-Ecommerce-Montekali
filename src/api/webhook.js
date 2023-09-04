const path = require('path');
const Gerapedido = require(path.join(__dirname, '..', 'webhook', './gerapedido'))
const gerapedido = new Gerapedido

gerapedido.getNumeroPedidoAtual()

class WebHook {
    statusPedido(req, res) {
        const object = req.body
        switch (object['type']) {
            case 'CREATED':
                this.onCreated(req, res);
                break
            case 'PICKING_FINISHED':
                this.onPickingFinished(req, res);
                break

            default:
                break;
        }
    }
    async onCreated(req, res) {
        const object = req.body
        var numeropedido = await gerapedido.reservaNumeroPedido(object['job']['id']);
        console.log(object['job']['id'], 'Status pedido');
        res.json({
            'AVISO': 'CREATED ACEITO',
            'NUMERO DO PEDIDO': numeropedido,
        })
    }
    onPickingFinished(req, res) {
        const itenspedido = [];
        const itensvalor = [];
        var objeto = req.body['job']['job_items'];
        var numeropedido = req.body['job']['externalData']['CODIGOPDV']
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
        const retorno = gerapedido.gravapedido(numeropedido, itensvalor);
        res.json({
            'AVISO': 'PICKING_FINISHED ACEITO',
            'NUMERO DO PEDIDO': retorno
        })
    }
}

module.exports = WebHook;