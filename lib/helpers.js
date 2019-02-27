/*
* Helpers for various tasks 
*
*/

// Dependencies
const crypto = require('crypto');
const config = require('../config');

// Create helpers container
const helpers = {};

// Create a SHA256 Hash
helpers.hash = function(str){
    if(typeof(str) === 'string' && str.length > 0) {
        const hash = crypto.createHmac('sha256', config.hashingSecret).update(str).digest('hex');
        return hash;
    }

    return false;
};

// Export helpers 
module.exports = helpers