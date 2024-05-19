const https = require('https');
const fs = require('fs');
const path = require('path');
const express = require('express');
const gots = require('../gotsjs');

// Paths for certificate and key files
const certPath = 'certificate.pem';
const keyPath = 'private_key.pem';
const outputDir = '../certs'; // User-defined output directory

// Generate and save certificate and private key using gots library
gots.generitiWaAhfedCert(certPath, keyPath, outputDir);

const app = express();

// Define routes
app.get('/', (req, res) => {
  res.send('Hello, HTTPS!');
});

// Set up HTTPS server
const options = {
  key: fs.readFileSync(path.join(outputDir, keyPath)), // Use output directory for key path
  cert: fs.readFileSync(path.join(outputDir, certPath)) // Use output directory for cert path
};

const server = https.createServer(options, app);

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
