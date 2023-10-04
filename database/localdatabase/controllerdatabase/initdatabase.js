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
                    margem_ativa numeric,
                    margem_sazonal numeric,
                    margem_sazonal_data_inicio TEXT,
                    margem_sazonal_data_fim TEXT,
                    margem_criada numeric
                    )`
            )
            this.db.run(`
            CREATE TABLE IF NOT EXISTS margem(
                margem_nome TEXT,
                margem_ativa numeric,
                margem_criada numeric
                )`
            )
            this.db.run(`
            CREATE TABLE IF NOT EXISTS usuarios(
                usuario_id INTEGER,
                usuario_nome TEXT,
                usuario_cargo TEXT,
                usuario_senha TEXT
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
                console.log(`Pedido inserido com o id ${idecommerce}`)
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
    getMargemAtivaLocalDB() {
        return new Promise((resolve, reject) => {
            this.db.all(`
            SELECT * FROM margem_produtos WHERE  margem_ativa = 1`,
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
    getMargemCabecalhoAtivaLocalDB() {
        return new Promise((resolve, reject) => {
            this.db.all(`
            SELECT * FROM margem WHERE margem_ativa = 1`,
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
    getAuthUsuario(usuario, senha) {
        return new Promise((resolve, reject) => {
            this.db.all(`
            SELECT * FROM usuarios WHERE usuario_cod = '${usuario}' and usuario_senha = '${senha}' and usuario_ativo = 1`,
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
    setMargemLocalDB(select) {
        return new Promise((resolve, reject) => {
            this.db.run(select,
                function (err) {
                    if (err) {
                        reject(`${err.message} ${select}`);
                        console.error(err.message);
                    }
                    else {
                        resolve(this.changes)
                        // console.log(`Registros atualizados: ${this.changes}`);
                    }
                }
            )
        })
    }
    getHorariosMargemLocalDB() {
        return new Promise((resolve, reject) => {
            this.db.all(`
                SELECT 
                horafuncao_unidade, 
                horafuncao_nome, 
                hora_inicio_hour, 
                hora_inicio_minute, 
                hora_inicio_second, 
                hora_inicio_millisecond, 
                hora_fim_hour, 
                hora_fim_minute, 
                hora_fim_second, 
                hora_fim_millisecond 
                FROM horarios
                WHERE horafuncao_ativa = 1
            `,
                function (err, rows) {
                    if (err) {
                        reject(err);
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
