const path = require('path');
const Gerapedido = require(path.join(__dirname, '..', 'webhook', './gerapedido'))
const localdatabase = require(path.join(__dirname, '..', '..', 'database', 'localdatabase', 'controllerdatabase', 'initdatabase.js'));
const db = new localdatabase()
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
    async getMargem(req, res) {
        const margens = await db.getMargemLocalDB()
        const resultado = {};
        margens.forEach(item => {
            const nome = item.margem_nome;
            const multiplo = item.margem_multiplo;
            const porcentagem = item.margem_porcentagem;
            const sazonal = item.margem_sazonal;
            const margemativa = item.margem_ativa
            const datainicio = item.margem_sazonal_data_inicio;
            const datafim = item.margem_sazonal_data_fim;

            if (!resultado[nome]) {
                resultado[nome] = [];
            }

            resultado[nome].push({ 'multiplo': multiplo.toString(), 'porcentagem': porcentagem, 'sazonal': sazonal, 'margemativa': margemativa, 'datainicio': datainicio, 'datafim': datafim, });
        });
        res.json(resultado)
    }
    async setMargem(req, res) {
        var valor = 0;
        console.log(req.body)
        for (const chave in req.body) {
            if (req.body.hasOwnProperty(chave)) {
                const arrayDeObjetos = req.body[chave];
                for (const objeto of arrayDeObjetos) {
                    await db.setMargemLocalDB(`
                    UPDATE margem_produtos 
                        set margem_porcentagem = ${objeto.porcentagem},
                        margem_sazonal = ${objeto.sazonal},
                        margem_sazonal_data_inicio = ${objeto.datainicio},
                        margem_sazonal_data_fim = ${objeto.datafim},
                        margem_ativa = ${objeto.margemativa}
                        where margem_nome = '${chave}' and margem_multiplo = ${objeto.multiplo}`).then(
                        (_) => valor += _
                    ).catch((_) => console.log(`erro ${_}`))
                }

            }
        }
        res.status(200).json({ "Valores Atualizados": valor })
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
