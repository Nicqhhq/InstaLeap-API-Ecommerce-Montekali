const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '..', '.env') })
var url = process.env.URLPRODUCAO;
var apikeyms = process.env.APIKEYMS;
var apikeykl = process.env.APIKEYKL;
var apikeycd = process.env.APIKEYATC;
var apiKeyMsLogistica = process.env.APIKEYMSLOGISTICA;
var apiKeyKLLogistica = process.env.APIKEYKLLOGISTICA;
var apiKeyAtcLogistica = process.env.APIKEYATCLOGISTICA;
var urlLogistica = process.env.URLLOGISTICA;
// var apikeyms = 'gM83fPNQyAxIDKJz3TwNQMakbaEWSs0vKLvIKnlLNMamaG';
// var apikeykl = 'sYmuMVKoT7JDhfQ2WvZndyPNLRO0lUa3Bize68Hx9CtgEqpIb5';
// var production_apikeykl = 'r5VQ7uZ2ec4JyYHvOkGXFKitbnmoaW9MS6RIg1CTdALjshEp0l';
// var production_apikeyatc = 'PyMCzt57GQV3SgsT1BjOJLm2vrYc9k8leZqaXRxWHuEpKbdiIn';
// var apikeycd = 'pk0vAWNz21EYBmjrKnROd4DwloM5Zt3c6sUIJ89fCbe7QGPaSh';
// exports.production_url = production_url;
exports.url = url;
exports.apikeyms = apikeyms;
exports.apikeykl = apikeykl;
exports.apikeycd = apikeycd;
exports.production_apikeykl = production_apikeykl;
exports.production_apikeyatc = production_apikeyatc;
exports.apiKeyMsLogistica = apiKeyMsLogistica;
exports.apiKeyKLLogistica = apiKeyKLLogistica;
exports.apiKeyAtcLogistica = apiKeyAtcLogistica;
exports.urlLogistica = urlLogistica;

