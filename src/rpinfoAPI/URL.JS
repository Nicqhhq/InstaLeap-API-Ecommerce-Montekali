const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '..', '.env') });
var url = process.env.URLRPSERVICES;
var usuario = process.env.APIRPSERVICESUSER;
var senha = process.env.APIRPSERVICESPASS;
var servidorDavEndereco = process.env.SERVIDORDAVENDERECO;
var servidorDavUsuario = process.env.SERVIDORDAVUSUARIO;
var servidorDavSenha = process.env.SERVIDORDAVSENHA;
var servidorDavDominio = process.env.SERVIDORDAVDOMINIO;


exports.url = url;
exports.usuario = usuario;
exports.senha = senha;
exports.servidorDavEndereco = servidorDavEndereco;
exports.servidorDavUsuario = servidorDavUsuario;
exports.servidorDavSenha = servidorDavSenha;
exports.servidorDavDominio = servidorDavDominio;