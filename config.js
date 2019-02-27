/*
* Configuration for our environments
*
*/


// Container for all environments
var environments = {};

// Default staging environment
environments.staging = {
    httpPort: 3000,
    httpsPort: 3001,
    envName: 'staging',
    hashingSecret: 'stageHashingSecret',
};

// Production environment
environments.production = {
    httpPort: 5000,
    httpsPort: 5001,
    envName: 'production',
    hashingSecret: 'prodHashingSecret'
};

// Determine which environment was passed as a cli argument
const currentEnvironment = typeof(process.env.NODE_ENV) === 'string' 
                                ? process.env.NODE_ENV.toLowerCase() 
                                : ''; 

// Determine environment to export
const environmentToExport = typeof(environments[currentEnvironment]) === 'object'
                                ? environments[currentEnvironment]
                                : environments.staging;

// Setting env
// NODE_ENV=production node index.js

// Export module
module.exports = environmentToExport; 