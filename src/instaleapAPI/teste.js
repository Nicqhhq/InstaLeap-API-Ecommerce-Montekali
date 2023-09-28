const path = require('path');
const { Database } = require('sqlite3');
const Migrations = require('../../database/migrations');
const instaleapAPI = require(path.join(__dirname, 'HTTPControlers.js'));
const migrations = require(path.join(__dirname, '..', '..', 'database', 'migrations.js'));
const LocalDatabase = require(path.join(__dirname, '..', '..', 'database', 'localdatabase', 'controllerdatabase', 'initdatabase.js'));
const axios = require('axios').default;
const log = require(path.join(__dirname, '..', 'configlogs', 'gravalog.js'));
const buffer = require('buffer');
buffer.constants.MAX_LENGTH = Infinity;

const db = new LocalDatabase();
async function teste() {
    const axiosInstance = axios.create({
        timeout: 90000, // Aumente o timeout para 10 segundos (ou o valor necessário).
    });

    const dados = new Migrations('002');
    const rows = await dados.get_dadosCriaProdutoInicial();
    const promisseslist = [];
    console.log(rows[0].length)
    for (let i = 0; i < rows[0].length; i++) {
        promisseslist.push(
            axiosInstance.post('https://redbook.xandar.instaleap.io/product/products', {
                photosUrl: [rows[0][i]['url_foto']],
                ean: [rows[0][i]['codbarras']],
                name: rows[0][i]['descricao'],
                sku: rows[0][i]['sku'],
                unit: rows[0][i]['unidade'],
                brand: rows[0][i]['marca'],
                clickMultiplier: rows[0][i]['clickmultiplier']
            }, {
                headers: {
                    'accept': 'application/json',
                    'x-api-key': 'gM83fPNQyAxIDKJz3TwNQMakbaEWSs0vKLvIKnlLNMamaG',
                    'content-type': 'application/json'
                }
            })
        );
        if (promisseslist.length === 200 || i === rows[0].length - 1) {
            const res = await Promise.all(promisseslist);
            res.forEach(response => {
                console.log('rodou'); // Imprime o status code de cada resposta
                log.gravaLog(response.toString());
            })
            promisseslist.length = 0; // Limpa a lista de promessas
        }
    }
}

teste();
