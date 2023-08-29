const fs = require('fs')
class Gerapedido {
    constructor() {
    }
    getNumeroPedido() {

    }
    getListaitem(numeropedido, itensvalor) {
        const listaitem = []
        //Grava Itens
        for (const codigos in itensvalor) {
            if (itensvalor.hasOwnProperty.call(itensvalor, codigos)) {
                const produtos = itensvalor[codigos];
                const itemean = produtos['ean'];
                const itemquantidade = produtos['quantidade'] * 1000
                const itemvalor = parseInt(produtos['valor'].toString().replace('.', ''))
                const itemvalorformt = itemvalor < 1000 ? itemvalor * 10 : itemvalor
                listaitem.push(`IT^A${itemean}^B${itemquantidade}^C${itemvalorformt}^`)
            }
        }
        return [listaitem, numeropedido];
    }
    gravapedido(numeropedido, itensvalor) {
        var listaitem = this.getListaitem(numeropedido, itensvalor);
        for (const itens in listaitem[0]) {
            if (listaitem[0].hasOwnProperty.call(listaitem[0], itens)) {
                const item = listaitem[0][itens];
                fs.appendFileSync(`${this.pedido}.txt`, `${item}\n`,)
            }
        }
        fs.appendFileSync(`${listaitem[1]}.txt`, `CRLF\n`,)
        console.log(`Pedido Gravado numero: ${listaitem[1]}`)
    }
}

module.exports = Gerapedido;
