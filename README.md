# SPRDS Library Documentation

The `SPRDS` library is a comprehensive toolkit designed for handling TLS, JWT, and data validation in a seamless manner. Developed originally in Go and compiled to JavaScript, this library provides robust security features essential for modern web applications.

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [TLS Functions](#tls-functions)
- [JWT Functions](#jwt-functions)
- [Data Validation](#data-validation)
- [Usage Examples](#usage-examples)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The `SPRDS` library offers a range of functionalities, including:

- **TLS Certificate and Key Generation**: Create and manage TLS certificates and private keys.
- **JWT Generation and Validation**: Securely generate and validate JSON Web Tokens.
- **Data Validation**: Validate user data against customizable rules.

## Installation

To install the `SPRDS` library, you can use npm:

    ```js
    npm install sprdss
    ```

## TLS Functions

The TLS functionalities in the spas library are provided through the gotsjs.js module.

### Benefits
Ensures secure communication via TLS.
Simplifies the process of generating and managing TLS certificates.

### Functions
generitiWaAhfedCert(certPath, keyPath, outputDir): Generates a TLS certificate and private key.

### Example
    ```bash
    const sps = require('sprdss');
    sps.generitiWaAhfedCert('certificate.pem', 'private_key.pem', './certs');
    console.log('Certificate and Private Key generation initiated.');


## JWT Functions

The JWT functionalities in the spas library are provided through the gowtjs.js module.

### Benefits
Provides secure token-based authentication.
Easy generation and validation of JWT tokens.

### Functions
generateToken(secretKey, expiration, username, role): Generates a JWT token.
validateToken(token, secretKey): Validates a JWT token.

### Example
      ```bash
      const sps = require('sprdss');
      const secretKey = 'supersecretkey';
      const expiration = 3600; // 1 hour
      const username = 'user123';
      const role = 'admin';
      
      const token = sps.generateToken(secretKey, expiration, username, role);
      console.log('Generated Token:', token);
      
      const validationResult = sps.validateToken(token, secretKey);
      console.log('Validation Result:', validationResult);

## Data Validation
The data validation functionalities in the spas library are provided through the SagemLData.js module.

### Benefits
Ensures data integrity and correctness.
Flexible and customizable validation rules.
Functions and Classes
SagemLData: Main class for data validation.
SagemLiThab(validatorName, validationFunction): Adds a custom validation function.
SagemEZ(data, rules): Validates data against the specified rules.

### Example
        ```bash
        const { SagemLData } = require('sprdss');
        const sps = new SagemLData();
        
        // Adding a custom validator for age
        sps.SagemLiThab('ageValidator', async (value) => {
          const minAge = 18;
          const maxAge = 100;
          if (typeof value !== 'number') return false;
          return value >= minAge && value <= maxAge;
        });
        
        // Sample user data
        const userData = {
          username: 'user123',
          password: 'securepassword',
          email: 'user123@example.com',
          age: 25,
        };
        
        // Validation rules for the user data
        const validationRules = {
          username: { type: 'string', minLength: 4, maxLength: 20 },
          password: { type: 'string', minLength: 8 },
          email: { type: 'string', format: 'email' },
          age: { type: 'number', custom: 'ageValidator' },
        };
        
        (async () => {
          try {
            const validationResult = await sps.SagemEZ(userData, validationRules);
            if (validationResult.isValid) {
              console.log('User data is valid!');
            } else {
              console.error('Validation errors:', validationResult.errors);
            }
          } catch (error) {
            console.error('Async validation error:', error);
          }
        })();
## Contributing
We welcome contributions to the SPRDS library. If you have any ideas, suggestions, or bug reports, please open an issue or submit a pull request.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

# © 2024 SPRDS. All rights reserved.
