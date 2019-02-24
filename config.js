/*
* Configuration for our environments
*
*/


// Container for all environments
var environments = {};

// Default staging environment
environments.staging = {
    port: 3000,
    envName: 'staging',
};

// Production environment
environments.production = {
    port: 5000,
    envName: 'production'
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