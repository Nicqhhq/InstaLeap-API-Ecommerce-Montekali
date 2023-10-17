const fs = require('fs')
const path = require('path');
const arquivopedido = path.join(__dirname, '..', '..', 'pedidos/');
const Instaleap = require(path.join(__dirname, '..', 'instaleapAPI', 'HTTPControlers.js'));
const localdatabase = require(path.join(__dirname, '..', '..', 'database', 'localdatabase', 'controllerdatabase', 'initdatabase.js'));
const Timer = require(path.join(__dirname, '..', 'configlogs', 'time.js'));
const timer = new Timer();
const data = timer.get_data_atual();
const db = new localdatabase()
const instaleap = new Instaleap()
console.log()
class Gerapedido {
    constructor() {
    }
    async getNumeroPedidoAtual() {
        const dadosUltimoPedido = await db.retornaUltimoPedido()
        return dadosUltimoPedido['pedido_num'] + 1;
    }
    async reservaNumeroPedido(jobId, unidade) {
        var instaleapAPI;
        switch (unidade) {
            case 'REDE_KALIMERA':
                instaleapAPI = new Instaleap('007')
                break;
            case 'MONTE_SERRAT':
                instaleapAPI = new Instaleap('002')
                break;
            case 'ATACADO_CERTO':
                instaleapAPI = new Instaleap('100')
                break;
        }
        console.log(jobId, 'reserva numero pedido');
        const ultimopedido = await this.getNumeroPedidoAtual()
        db.gravaPedido(data, unidade, jobId);
        instaleapAPI.atualizaNumeracaoPedido(jobId, ultimopedido);
        return ultimopedido;
    }
    getListaitem(numeropedido, itensvalor) {
        const listaitem = []
        for (const codigos in itensvalor) {
            if (itensvalor.hasOwnProperty.call(itensvalor, codigos)) {
                const produtos = itensvalor[codigos];
                var itemean = produtos['ean'];
                var itemquantidade = produtos['quantidade']
                var itemvalor = parseInt(produtos['valor'].toString().replace('.', ''))
                var itemunidade = produtos['unidade']
                var linhaItemQuantidade = ``;
                var linhaItemValor = ``;
                console.log(`Valor Quantidade Sem Formatar ${itemquantidade}`);
                console.log(`Valor Preco Sem Formatar ${itemvalor}`);
                //validacao quantidade
                if (itemunidade == 'KG') {
                    itemquantidade = itemquantidade * 1000
                    if (itemquantidade < 1000) {
                        // console.log('Menor que 1000')
                        linhaItemQuantidade = `000${itemquantidade}00`
                    }
                    else if (itemquantidade < 10000) {
                        // console.log('menor que 10000')
                        linhaItemQuantidade = `00${itemquantidade}00`
                    }
                    else if (itemquantidade < 100000) {
                        // console.log('menor que 100000')
                        linhaItemQuantidade = `00${itemquantidade}0`
                    }
                    else if (itemquantidade < 1000000) {
                        // console.log('menor que 1000000')
                        linhaItemQuantidade = `00${itemquantidade}`
                    }
                    // console.log(`KG IT${itemean}${linhaItemQuantidade}${linhaItemValor}`)
                }
                else {
                    itemquantidade * 100
                    if (itemquantidade < 1000) {
                        // console.log('Menor que 1000')
                        linhaItemQuantidade = `00${itemquantidade}00000`
                    }
                    else {
                        // console.log('Maior que 1000')
                        linhaItemQuantidade = `00${itemquantidade}0000`
                    }
                    // console.log(`UN IT${itemean}${linhaItemQuantidade}${linhaItemValor}`)
                }
                // tratativa valor
                if (itemvalor < 100) {
                    console.log("Valor menor que 100")
                    linhaItemValor = `000000${itemvalor}`
                }
                else if (itemvalor < 1000) {
                    console.log("Valor menor que 1000")
                    linhaItemValor = `00000${itemvalor}`
                }
                else if (itemvalor < 10000) {
                    console.log("Valor menor que 10000")
                    linhaItemValor = `0000${itemvalor}`
                }
                else if (itemvalor < 100000) {
                    console.log("Valor menor que 100000")
                    linhaItemValor = `000${itemvalor}`
                }
                else if (itemvalor < 1000000) {
                    console.log("Valor menor que 1000000")
                    linhaItemValor = `00${itemvalor}`
                }
                else if (itemvalor < 10000000) {
                    console.log("Valor menor que 10000000")
                    linhaItemValor = `0${itemvalor}`
                }
                listaitem.push(`IT${itemean}${linhaItemQuantidade}${linhaItemValor}`)
            }
        }
        return [listaitem, numeropedido];
    }
    gravapedido(numeropedido, itensvalor) {
        fs.appendFileSync(`${arquivopedido}VD${numeropedido}.txt`, `CL000000\n`,)
        var listaitem = this.getListaitem(numeropedido, itensvalor);
        for (const itens in listaitem[0]) {
            if (listaitem[0].hasOwnProperty.call(listaitem[0], itens)) {
                const item = listaitem[0][itens];
                fs.appendFileSync(`${arquivopedido}VD${numeropedido}.txt`, `${item}\n`,)
            }
        }
        fs.appendFileSync(`${arquivopedido}VD${numeropedido}.txt`, `AC000\n`,),
            console.log(`Pedido Gravado numero: ${numeropedido}`)
        return numeropedido;

    }
}

module.exports = Gerapedido;

