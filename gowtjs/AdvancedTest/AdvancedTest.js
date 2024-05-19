// Import the GoWTJS library with only GenerateToken and ValidateToken functions
const gowtjs = require('../gowtjs.js');

// Define secret key, expiration, username, and role
const secretKey = 'sprd';
const expiration = 3600; // 1 hour expiration in seconds
const username = 'exampleuser';
const role = 'admin';

// Function to simulate user login and generate JWT token
function userLogin(username, password) {
    // Simulate user authentication logic here, e.g., check credentials
    if (username === 'ssprrdd' && password === 'ssprrdd') {
        // Generate JWT token upon successful authentication
        const token = gowtjs.generateToken(secretKey, expiration, username, role);
        return { success: true, token: token };
    } else {
        return { success: false, message: 'Invalid credentials' };
    }
}

// Function to validate JWT token for user authentication
function authenticateUser(token) {
    // Validate the token using the ValidateToken function
    const validationResult = gowtjs.validateToken(token, secretKey);
    if (validationResult) {
        // Token is valid, extract user information from the token
        const decodedToken = token.split('.')[1]; // Extract payload part
        const decodedPayload = JSON.parse(Buffer.from(decodedToken, 'base64').toString('utf-8')); // Decode base64 payload and parse as JSON
        const user = decodedPayload.username; // Extract username from payload
        return { success: true, user: user };
    } else {
        return { success: false, message: 'Token validation failed' };
    }
}

// Simulate user login attempt
const loginResult = userLogin('ssprrdd', 'ssprrdd');
if (loginResult.success) {
    const userToken = loginResult.token;
    console.log('Login successful. Token:', userToken);

    // Simulate user authentication using the generated token
    const authResult = authenticateUser(userToken);
    if (authResult.success) {
        console.log('Authentication successful. User:', authResult.user);
    } else {
        console.log('Authentication failed. Reason:', authResult.message);
    }
} else {
    console.log('Login failed. Reason:', loginResult.message);
}
