// Import GenerateToken and ValidateToken from main.js
require('./main.js');

// Export functions for external use under the gowtjs namespace
const gowtjs = {
    generateToken: function(secretKey, expiration, username, role) {
        return GenerateToken(secretKey, expiration, username, role);
    },
    validateToken: function(token, secretKey) {
        return ValidateToken(token, secretKey);
    }
};

module.exports = gowtjs;
