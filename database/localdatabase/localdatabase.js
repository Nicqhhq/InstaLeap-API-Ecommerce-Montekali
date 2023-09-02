const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(path.join(__dirname, 'localdatabase.db'), (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Conectado a Base de dados local');
})

exports.db = db;