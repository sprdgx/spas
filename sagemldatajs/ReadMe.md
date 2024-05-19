# 🔒 GotsJS - Go Js TLS Library

GotsJS is a Golang JavaScript library for generating self-signed TLS certificates and managing TLS connections. It simplifies the process of handling TLS certificates, especially for development and testing purposes.

## ✨ Features 

  **Certificate Generation:**
    Easily generate self-signed TLS certificates with a simple function call.

  **Key Pair Creation:**
    Create private key and public key pairs for secure communication.

  **Certificate Storage:** 
    Save generated certificates and keys to specified directories.

  **Flexible Configuration:**
    Customize certificate and key file names and output directories as per your needs.
    
  **Error Handling:** 
    Comprehensive error handling for smooth troubleshooting and debugging.

## ⚙️ Installation

To start using GotsJS in your Node.js project, you can install it via npm

**npm install GotsJS**

## 🔧 Usage

Here's an example of how you can utilize GotsJS to generate self-signed TLS certificates and set up an HTTPS server:

1. **Import GotsJS: Import GotsJS into your project using require:**

   ```bash
   const gots = require('gotsjs');

2. **Generate TLS Certificate: Generate a self-signed TLS certificate and private key:**
   
   ```bash
   gots.generateAndSaveCert('certificate.pem', 'private_key.pem', './certificates');
   
3. **Set Up HTTPS Server: Create an HTTPS server using the generated certificate and private key:**

   ```bash

    const https = require('https');
    const fs = require('fs');
    const path = require('path');

    // Load generated certificate and private key
    const certPath = path.join(__dirname, 'certificates', 'certificate.pem');
    const keyPath = path.join(__dirname, 'certificates', 'private_key.pem');
    const cert = fs.readFileSync(certPath);
    const key = fs.readFileSync(keyPath);

    // Set up HTTPS server with loaded certificate and private key
    const options = { cert, key };
    const server = https.createServer(options, (req, res) => {
    res.writeHead(200);
    res.end('Hello, HTTPS!');
    });

    server.listen(443, () => {
    console.log('Server running on port 443');
    });

## 🤔 Why Use GotsJS? 

  **Simplicity:**
    Easily generate self-signed TLS certificates without complex configurations.

  **Convenience:**
    Simplify TLS certificate management for development and testing purposes.

  **Flexibility:** 
    Integrate TLS functionality seamlessly into Node.js applications.

## 🤝 Contributing

Contributions to GotsJS are welcome! If you encounter any issues or have suggestions for improvements, please open an issue or submit a pull request on [GitHub repository ](https://github.com/sprdgx/GotsJS).

## 📄 License

This project is licensed under the MIT License.


**Thank you for choosing GotsJS for your TLS certificate generation and management! If you have any questions, need assistance, or want to contribute to the project, feel free to reach out. Happy secure communication with GotsJS! 🌟**