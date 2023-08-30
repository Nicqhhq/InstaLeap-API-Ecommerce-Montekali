const api = require('express');


class Express {
    constructor() {
        this.app = api();
        this.port = 3000;
        this.middleware()
        this.routes()
    }

    middleware() {
        this.app.use(api.json());
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


