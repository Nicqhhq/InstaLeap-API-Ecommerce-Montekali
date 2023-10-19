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
                var itemvalor = (produtos['valor'])
                var itemunidade = produtos['unidade']
                function gerarLinhaItem(ean, quantidade, preco) {
                    // Arredonda a quantidade para 4 casas decimais e o preço para 2 casas decimais
                    quantidade = parseFloat(quantidade.toFixed(4));
                    preco = parseFloat(preco.toFixed(2));

                    // Converte a quantidade para o formato desejado
                    quantidade = (quantidade * 10000).toFixed(0).toString().padStart(7, '0');

                    // Converte o preço para o formato desejado
                    preco = (preco * 100).toFixed(0).toString().padStart(8, '0');

                    // Formata a linha item
                    const linhaItem = `IT${ean}${quantidade}${preco}`;

                    return linhaItem;
                }
                listaitem.push(gerarLinhaItem(itemean, itemquantidade, itemvalor))
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


// if (itemunidade == 'KG') {
//     if (itemquantidade < 10) {
//         itemquantidade = itemquantidade.toString().replace('.', '')
//         // console.log("Menor que 10")
//         // console.log(itemquantidade.length)
//         if (itemquantidade.length > 3) {
//             itemquantidade = itemquantidade.substring(0, 4)
//             linhaItemQuantidade = `00${itemquantidade}00`
//             // console.log('Maior que 3')
//         } if (itemquantidade.length == 3) {
//             linhaItemQuantidade = `00${itemquantidade}000`
//             // console.log('menor ou igual que 3')
//         } if (itemquantidade.length == 2) {
//             linhaItemQuantidade = `00${itemquantidade}0000`
//             // console.log('menor ou igual que 2')
//         } if (itemquantidade.length == 1) {
//             // console.log('menor ou igual que 1')
//             linhaItemQuantidade = `00${itemquantidade}00000`
//         }
//     }
//     else if (itemquantidade < 100) {
//         itemquantidade = itemquantidade.toString().replace('.', '')
//         // console.log(itemquantidade.length)
//         // console.log("menor que 100")
//         if (itemquantidade.length > 4) {
//             itemquantidade = itemquantidade.substring(0, 5)
//             linhaItemQuantidade = `0${itemquantidade}00`
//             // console.log('Maior que 4')
//         } if (itemquantidade.length == 4) {
//             linhaItemQuantidade = `0${itemquantidade}000`
//             // console.log('menor ou igual que 3')
//         } if (itemquantidade.length == 3) {
//             linhaItemQuantidade = `0${itemquantidade}0000`
//             // console.log('menor ou igual que 2')
//         } if (itemquantidade.length == 2) {
//             // console.log('menor ou igual que 1')
//             linhaItemQuantidade = `0${itemquantidade}00000`
//         }
//     }
//     else if (itemquantidade < 1000) {
//         itemquantidade = itemquantidade.toString().replace('.', '')
//         // console.log("Menor que 1000")
//         // console.log(itemquantidade.length)
//         // console.log("menor que 100")
//         if (itemquantidade.length > 5) {
//             itemquantidade = itemquantidade.substring(0, 6)
//             linhaItemQuantidade = `${itemquantidade}00`
//             // console.log('Maior que 4')
//         } if (itemquantidade.length == 5) {
//             linhaItemQuantidade = `${itemquantidade}000`
//             // console.log('menor ou igual que 3')
//         } if (itemquantidade.length == 4) {
//             linhaItemQuantidade = `${itemquantidade}0000`
//             // console.log('menor ou igual que 2')
//         } if (itemquantidade.length == 3) {
//             // console.log('menor ou igual que 1')
//             linhaItemQuantidade = `${itemquantidade}00000`
//         }

//     }
// }
// else {
//     // console.log(`O item ${produtos['ean']} é UN`)
//     itemquantidade * 100
//     if (itemquantidade < 10) {
//         // console.log(itemquantidade)
//         // console.log('Menor que 10')
//         linhaItemQuantidade = `00${itemquantidade}00000`
//     }
//     else if (itemquantidade < 100) {
//         // console.log(itemquantidade)
//         // console.log('Menor que 100')
//         linhaItemQuantidade = `0${itemquantidade}00000`
//     }
//     else if (itemquantidade < 1000) {
//         // console.log(itemquantidade)
//         // console.log('Menor que 1000')
//         linhaItemQuantidade = `${itemquantidade}00000`
//     }
// }