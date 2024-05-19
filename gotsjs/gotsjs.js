const fs = require('fs');
const path = require('path');

/**
 * Generates a certificate and private key, and saves them to specified paths.
 * @param {string} certPath - Path to save the certificate file.
 * @param {string} keyPath - Path to save the private key file.
 * @param {string} outputDir - Optional: Directory where files should be saved.
 */
function generitiWaAhfedCert(certPath, keyPath, outputDir = __dirname) {
  // Define the paths for certificate and key files
  const certFilePath = path.join(outputDir, certPath);
  const keyFilePath = path.join(outputDir, keyPath);

  try {
    // Assuming 'generateCert' is a function from './main.js' that generates the certificate and private key
    const { generitiCert } = require('./main.js');
    const result = generitiCert();

    // Save certificate to file
    fs.writeFileSync(certFilePath, result.certificate);
    console.log('Certificate saved to:', certFilePath);

    // Save private key to file
    fs.writeFileSync(keyFilePath, result.privateKey);
    console.log('Private Key saved to:', keyFilePath);
  } catch (error) {
    console.error('Error generating or saving certificate:', error);
  }
}

module.exports = { generitiWaAhfedCert };
