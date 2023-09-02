const pg = require('pg');

const pool = new pg.Pool({
    user: 'consulta',
    host: '10.110.106.216',
    database: 'erp',
    password: 'c0d1g0',
    port: 5432,
})


function bdconexao() {
    pool.connect((err, client, done) => {
        if (err) {
            console.error('Erro ao conectar com Banco ERP', err);
        } else {
            console.log('Conexão com Banco ERP bem sucedida');
        }
        done();
    });
}


exports.pool = pool;
exports.bdconexao = bdconexao;
