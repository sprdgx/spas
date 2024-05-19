// Import functions from 'sps.js'
const sps = require('../spas.js');

// Call the generitiWaAhfedCert function from gotsjs using the sps namespace
sps.generitiWaAhfedCert('certificate.pem', 'private_key.pem', './certs');

console.log('Certificate and Private Key generation initiated.');
