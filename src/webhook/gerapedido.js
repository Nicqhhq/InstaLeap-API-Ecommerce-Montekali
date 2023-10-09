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
        console.log(jobId, 'reserva numero pedido');
        const ultimopedido = await this.getNumeroPedidoAtual()
        db.gravaPedido(data, unidade, jobId);
        instaleap.atualizaNumeracaoPedido(jobId, ultimopedido);
        return ultimopedido;
    }
    getListaitem(numeropedido, itensvalor) {
        const listaitem = []
        for (const codigos in itensvalor) {
            if (itensvalor.hasOwnProperty.call(itensvalor, codigos)) {
                const produtos = itensvalor[codigos];
                const itemean = produtos['ean'];
                const itemquantidade = produtos['quantidade'] * 1000
                const itemvalor = parseInt(produtos['valor'].toString().replace('.', ''))
                const itemvalorformt = itemvalor < 1000 ? itemvalor * 10 : itemvalor
                listaitem.push(`IT${itemean}00${itemquantidade}000000${itemvalorformt}`)
            }
        }
        return [listaitem, numeropedido];
    }
    gravapedido(numeropedido, itensvalor) {
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

