const path = require('path');
const sqlite3 = require('sqlite3');
class LocalDatabase {
    constructor() {
        this.db = new sqlite3.Database(path.join(__dirname, '..', 'localdatabase.db'), (err) => {
            if (err) {
                console.error(err.message);
            }
            console.log('Conectado a Base de dados local');
            this.iniciaTabelas()
        })
    }
    iniciaTabelas() {
        this.db.serialize(() => {
            this.db.run(`
            CREATE TABLE IF NOT EXISTS pedidos(
                    pedido_num INTEGER PRIMARY KEY,
                    pedido_data TEXT,
                    pedido_unidade_ecommerce TEXT,
                    pedido_id_ecommerce TEXT
                    )`
            )
            this.db.run(`
            CREATE TABLE IF NOT EXISTS margem_produtos(
                    margem_nome TEXT,
                    margem_multiplo numeric,
                    margem_porcentagem numeric,
                    margem_sazonal numeric,
                    margem_sazonal_data_inicio TEXT,
                    margem_sazonal_data_fim TEXT
                    )`
            )
        }
        )
    }
    gravaPedido(datapedido, unidadepedido, idecommerce) {
        this.db.run(`
        INSERT INTO pedidos(
            pedido_data, 
            pedido_unidade_ecommerce, 
            pedido_id_ecommerce 
            ) 
            VALUES  (?, ?, ?)`,
            [datapedido, unidadepedido, idecommerce],
            function (err) {
                if (err) {
                    return console.error(err.message);
                }
                console.log(`Pedido inserido com o id ${this.id}`)
            });
    }
    retornaUltimoPedido() {
        return new Promise((resolve, reject) => {
            this.db.get(`
         select * from pedidos
          order by pedido_num desc 
             limit 1 
         `,
                function (err, rows) {
                    if (err) {
                        reject(err.message);
                    }

                    resolve(rows)
                }
            )
        })
    }
    getMargemLocalDB() {
        return new Promise((resolve, reject) => {
            this.db.all(`
            SELECT * FROM margem_produtos`,
                function (err, rows) {
                    if (err) {
                        reject(err.message)
                    }
                    else {
                        resolve(rows)
                    }
                }
            )
        })
    }
}

module.exports = LocalDatabase;

// const teste = new LocalDatabase();

// // const teste1 = teste.retornaUltimoPedido().then(teste => console.log(teste)).catch(err => console.log(err))

// async function teste3() {
//     const teste1 = await teste.getMargemLocalDB()
//     console.log(teste1);

// }
// teste3()