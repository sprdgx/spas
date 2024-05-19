// Import functions from 'sps.js'
const sps = require('../spas.js');

// Define secret key, expiration, username, and role
const secretKey = 'sprd';
const expiration = 3600; // 1 hour expiration in seconds
const username = 'sprd';
const role = 'admin';

// Call the GenerateToken function from sps.js using the sps namespace
const token = sps.generateToken(secretKey, expiration, username, role);
console.log('Generated Token:', token);

// Call the ValidateToken function from sps.js using the sps namespace
const validationResult = sps.validateToken(token, secretKey);
console.log('Validation Result:', validationResult);
