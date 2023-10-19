const fs = require('fs')
const path = require('path');
const arquivopedido = path.join(__dirname, '..', '..', 'pedidos/');
const Instaleap = require(path.join(__dirname, '..', 'instaleapAPI', 'HTTPControlers.js'));
const localdatabase = require(path.join(__dirname, '..', '..', 'database', 'localdatabase', 'controllerdatabase', 'initdatabase.js'));
const Timer = require(path.join(__dirname, '..', 'configlogs', 'time.js'));
const urlRP = require(path.join(__dirname, '..', 'rpinfoAPI', 'url.js'))
const timer = new Timer();
const data = timer.get_data_atual();
const db = new localdatabase()
const instaleap = new Instaleap()
const SambaClient = require('samba-client');
console.log()
class Gerapedido {
    constructor() {
        this.client = new SambaClient({
            address: urlRP.servidorDavEndereco, // required
            username: urlRP.servidorDavUsuario, // not required, defaults to guest
            password: urlRP.servidorDavSenha, // not required
            domain: urlRP.servidorDavDominio, // not required
            maxProtocol: 'SMB3', // not required
            maskCmd: true, // not required, defaults to false
        });
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
                    quantidade = parseFloat(quantidade.toFixed(4));
                    preco = parseFloat(preco.toFixed(2));
                    quantidade = (quantidade * 10000).toFixed(0).toString().padStart(7, '0');
                    preco = (preco * 100).toFixed(0).toString().padStart(8, '0');
                    const linhaItem = `IT${ean}${quantidade}${preco}`;
                    return linhaItem;
                }
                listaitem.push(gerarLinhaItem(itemean, itemquantidade, itemvalor))
            }
        }
        return [listaitem, numeropedido];
    }
    async gravapedido(numeropedido, itensvalor) {
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
        await this.client.sendFile(`${arquivopedido}VD${numeropedido}.txt`, `/VD${numeropedido}.txt`).then((_) => { console.log(_) }).catch((_) => { console.log(_) })
        return numeropedido;

    }
}

module.exports = Gerapedido;

