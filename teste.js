const path = require('path');
const APIRP = require(path.join(__dirname, 'src', 'rpinfoAPI', 'HTTPControlers.js'));
const api = new APIRP('002')


api.InserePedidoPVD({
    "nome": 'Nicolas Pimenta Da Silva',
    "endereco": {
        'cep': '13295580',
        'rua': 'Rua Ary Silva Brandao',
        'bairro': 'Ana Luiza',
        'numero': '238',
    },
    "cpf": '99853507072',
    "orgaoExpRG": "SP",
    "ufExpRG": "SP",
    "email": "nic200433@gmail.com"
})
// .then((_) => console.log(_));

