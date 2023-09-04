const path = require('path');
const sqlite3 = require('sqlite3');
class LocalDatabase {
    constructor() {
        this.db = new sqlite3.Database(path.join(__dirname, '..', 'localdatabase.db'), (err) => {
            if (err) {
                console.error(err.message);
            }
            console.log('Conectado a Base de dados local');
        })
    }
    iniciaTabelas() {
        this.db.serialize(() => {
            this.db.run(`
            CREATE TABLE IF NOT EXISTS pedidos(
                    pedido_num INTEGER PRIMARY KEY,
                    pedido_data text,
                    pedido_unidade_ecommerce text,
                    pedido_id_ecommerce text
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
}

module.exports = LocalDatabase;

// const teste = new LocalDatabase();

// // const teste1 = teste.retornaUltimoPedido().then(teste => console.log(teste)).catch(err => console.log(err))

// async function teste3() {
//     const teste1 = await teste.retornaUltimoPedido()
//     console.log(teste1);

// }
// teste3()