const fs = require('fs')
class Gerapedido {
    constructor() {
    }
    getNumeroPedidoAtual() {
        try {
            const data = fs.readFileSync('numeropedido.txt', 'utf8');
            return data
        } catch (error) {
            if (error.code == 'ENOENT') {
                console.log("nao ha arquivo de pedido \n iniciando geracao de um novo");
                try {
                    fs.writeFileSync('numeropedido.txt', '0',);
                    return "0"
                } catch (error) {
                    console.log("Erro ao criar o txt na pasta `")
                }
            }
        }
    }
    AtualizaNumeroPedido() {
        const pedidoatual = this.getNumeroPedidoAtual()
        const pedidoatualizado = parseInt(pedidoatual) + 1
        try {
            fs.writeFileSync('numeropedido.txt', `${pedidoatualizado}`)
        } catch (error) {
            console.log("Erro ao atualizar sequencial pedido");
        }
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
        var numeropedido = parseInt(this.getNumeroPedidoAtual()) + 1
        var listaitem = this.getListaitem(numeropedido, itensvalor);
        for (const itens in listaitem[0]) {
            if (listaitem[0].hasOwnProperty.call(listaitem[0], itens)) {
                const item = listaitem[0][itens];
                fs.appendFileSync(`./pedidos/${numeropedido}.txt`, `${item}\n`,)
            }
        }
        fs.appendFileSync(`./pedidos/${numeropedido}.txt`, `CRLF\n`,),
            this.AtualizaNumeroPedido();
        console.log(`Pedido Gravado numero: ${numeropedido}`)
        return numeropedido;
    }
}

module.exports = Gerapedido;


