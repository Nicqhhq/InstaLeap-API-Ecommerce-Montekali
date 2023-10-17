const path = require('path');
const Gerapedido = require(path.join(__dirname, '..', 'webhook', './gerapedido'));
const ApiRP = require(path.join(__dirname, '..', 'rpinfoAPI', 'HTTPControlers.js'));
const Migrations = require(path.join(__dirname, '..', '..', 'database', 'migrations.js'))
const log = require(path.join(__dirname, '..', 'configlogs', 'gravalog.js'));
const db = new Migrations();
const gerapedido = new Gerapedido();
const apiRP = new ApiRP();
class WebHook {
    statusPedido(req, res) {
        const object = req.body
        switch (object['type']) {
            case 'CREATED':
                if (object['clientId'] == 'GRUPO_MONTEKALI') {
                    this.onCreatedAtacado(req, res);
                } else {
                    this.onCreatedVarejo(req, res);
                }
                break
            case 'PICKING_FINISHED':
                this.onPickingFinished(req, res);
                break
            default:
                break;
        }
    }
    async onCreatedVarejo(req, res) {
        const object = req.body
        var numeropedido = await gerapedido.reservaNumeroPedido(object['job']['id'], object['clientId']);
        console.log(object['job']['id'], 'Status pedido');
        log.gravaLog(`WebHook: OnCreated Varejo numero reservado ${numeropedido}`)
        res.json({
            'AVISO': 'CREATED ACEITO',
            'NUMERO DO PEDIDO': numeropedido,
        })
    }
    async onCreatedAtacado(req, res) {
        const object = req.body
        var numeropedido = await gerapedido.reservaNumeroPedido(object['job']['id'], object['clientId']);
        log.gravaLog(`WebHook: Oncreated Atacado numero reservado ${numeropedido}`)
        const itenspedido = [];
        const itensvalor = [];
        var responsebody = req.body
        var objeto = responsebody['job']['job_items'];
        for (const itens in objeto) {
            if (objeto.hasOwnProperty.call(objeto, itens)) {
                const produtos = objeto[itens];
                itenspedido.push(produtos)
            }
        }
        for (const itens in itenspedido) {
            if (itenspedido.hasOwnProperty.call(itenspedido, itens)) {
                const produtos = itenspedido[itens];
                itensvalor.push({
                    codigoProduto: produtos['attributes']['sku'],
                    valorProduto: produtos['attributes']['posPrice'],
                    qtdUnitaria: produtos['found_quantity'],
                    qtdEmbalagem: produtos['found_quantity'],
                })
            }
        }
        const dados = {
            'cliente': {
                'nome': responsebody['job']['recipient']['name'],
                'email': responsebody['job']['recipient']['email'],
                'numero': responsebody['job']['recipient']['phone_number'],
                'cpf': '12028693002',
                'endereco': {
                    'cep': '13295580',
                    'cidade': '4004',
                    'endereco': 'Ary Silva Brandão',
                    'bairro': 'Portal Santa Fé',
                    'numero': '238'
                }
            },
            'pedido': {
                'numeropedido': numeropedido,
                'itens': {
                    itensvalor
                }
            }
        }
        await apiRP.InserePedidoPVD(dados).then((_) => {
            res.json({
                'AVISO': 'CREATED ACEITO',
                'NUMERO DO PEDIDO': numeropedido,
            })
        }).catch((_) => {
            res.json({
                'AVISO': _
            })
        })

    }
    onPickingFinished(req, res) {
        const itenspedido = [];
        const itensvalor = [];
        var objeto = req.body['job']['job_items'];
        var numeropedido = req.body['job']['externalData']['CODIGOPDV']
        log.gravaLog(`WebHook: PickingFinished Pedido Recebido ERP numero : ${numeropedido}`)
        for (const itens in objeto) {
            if (objeto.hasOwnProperty.call(objeto, itens)) {
                const produtos = objeto[itens];
                itenspedido.push(produtos)
            }
        }
        for (const itens in itenspedido) {
            if (itenspedido.hasOwnProperty.call(itenspedido, itens)) {
                const produtos = itenspedido[itens];
                if (produtos['status'] == 'ADDED') {
                    itensvalor.push({
                        ean: produtos['attributes']['ean'],
                        valor: (produtos['attributes']['posPrice'] * produtos['found_quantity']).toFixed(5).toString().replace('.', '').substring(0, 5),
                        quantidade: produtos['found_quantity'],
                        unidade: produtos['unit']
                    })
                }
            }
        }
        const retorno = gerapedido.gravapedido(numeropedido, itensvalor);
        log.gravaLog(`WebHook: PickingFinished Pedido Gravado ERP numero : ${retorno}`)
        res.json({
            'AVISO': 'PICKING_FINISHED ACEITO',
            'NUMERO DO PEDIDO': retorno
        })
    }
    async authUser(req, res) {
        const body = req.body;
        const usuario = body['usuario'];
        const senha = body['senha'];
        console.log(body)
        const teste = await db.getAuthUsuario(usuario, senha)
        if (Object.values(teste).length > 0) {
            res.status(200).send(teste)
        }
        else {
            res.status(401).send({
                "usuario": 'nao autorizado'
            });
        }
        console.log(usuario, senha)
    }

}

module.exports = WebHook;
