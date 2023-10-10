const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '..', '.env') })
var url = process.env.URLRPSERVICES;
var usuario = process.env.APIRPSERVICESUSER;
var senha = process.env.APIRPSERVICESPASS;
exports.url = url;
exports.usuario = usuario;
exports.senha = senha;
