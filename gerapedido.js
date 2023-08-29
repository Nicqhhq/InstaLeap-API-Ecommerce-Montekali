const fs = require('fs')
class Gerapedido {
    constructor(pedido, itens, cliente, endereco, pagamento) {
        this.pedido = pedido;
        this.itens = itens;
        this.cliente = cliente;
        this.endereco = endereco;
        this.pagamento = pagamento;
    }
    get getitens() {
        return this.itens
    }
    getListaitem() {
        const listaitem = []
        //Grava Itenss
        for (const codigos in this.itens) {
            if (this.itens.hasOwnProperty.call(this.itens, codigos)) {
                const produtos = this.itens[codigos];
                const itemean = produtos['ean'];
                const itemquantidade = produtos['quantidade'] * 1000
                const itemvalor = parseInt(produtos['valor'].toString().replace('.', ''))
                const itemvalorformt = itemvalor < 1000 ? itemvalor * 10 : itemvalor
                listaitem.push(`IT^A${itemean}^B${itemquantidade}^C${itemvalorformt}^`)
            }
        }
        return listaitem;
    }
    gravapedido() {
        var listaitem = this.getListaitem();
        for (const itens in listaitem) {

            if (listaitem.hasOwnProperty.call(listaitem, itens)) {
                const item = listaitem[itens];
                fs.appendFileSync(`${this.pedido}.txt`, `${item}\n`,)
            }
        }
        fs.appendFileSync(`${this.pedido}.txt`, `CRLF\n`,)
        console.log(`Pedido Gravado numero: ${this.pedido}`)
    }
}

module.exports = Gerapedido;
