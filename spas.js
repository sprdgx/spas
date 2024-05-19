// Import functions from 'gotsjs.js'
const { generitiWaAhfedCert } = require('./gotsjs/gotsjs.js');

// Import class from 'SagemlData.js'
const SagemLData = require('./sagemldatajs/SagemLData.js');

// Import functions from 'gowtjs.js' and rename them for clarity
const { generateToken: generateTokenGowtjs, validateToken: validateTokenGowtjs } = require('./gowtjs/gowtjs.js');

// Create an instance of the SagemLData class
const sagemLDataInstance = new SagemLData();

// Export all functions and classes for external use under the 'sps' namespace
module.exports = {
    // Functions from 'gotsjs.js'
    generitiWaAhfedCert: generitiWaAhfedCert,

    // Class from 'SagemlData.js'
    SagemLData: SagemLData,

    // Functions from 'gowtjs.js' with renamed keys
    generateToken: generateTokenGowtjs,
    validateToken: validateTokenGowtjs,

    // Instance of SagemLData class
    sagemLDataInstance: sagemLDataInstance
};
