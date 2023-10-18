const api = require('express');
const cors = require('cors')
const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '..', '..', '.env') })
class Express {
    constructor() {
        this.app = api();
        this.port = process.env.PORTASERVER;
        this.middleware()
        this.routes()
    }

    middleware() {
        this.app.use(api.json());
        this.app.use(cors());
    }

    routes() {
        this.app.use(require('./routes'));
    }

    start() {
        this.app.listen(this.port, () => {
            console.log(`Servidor Rodando na porta ${this.port}`)
        });
    }


}

module.exports = Express;


