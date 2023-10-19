const SambaClient = require('samba-client');

let client = new SambaClient({
    address: '//10.110.106.47/DAV', // required
    username: 'nicolas.pimenta', // not required, defaults to guest
    password: 'alexandrina2012', // not required
    domain: 'montekali.com', // not required
    maxProtocol: 'SMB3', // not required
    maskCmd: true, // not required, defaults to false
});

// send a file
client.sendFile('./pedidos/VD104.txt', '/VD104.txt').then((_) => { console.log(_) }).catch((_) => { console.log(_) })




// // get a file
// await client.getFile('someRemotePath/file', 'destinationFolder/name');

// // create a folder
// await client.mkdir('folder/tree', 'current/working/directory');
// // By default CWD is __dirname

// // executes dir command in remote directory
// await client.dir('remote/folder', 'current/working/directory');
// // By default CWD is __dirname

// // validate if file or folder exists in the remote device
// await client.fileExists('remote/file', 'current/working/directory');
// // By default CWD is __dirname


