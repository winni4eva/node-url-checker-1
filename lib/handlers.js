/*
* Route Handlers
*
*/

// Dependencies
const _data = require('./data');
const helpers = require('./helpers');



// Define Route Handlers
const handlers = {
    users: function(data, callback){ // Users request handler
        const allowedRequestMethods = ['get', 'post', 'put', 'delete'];
        if(~allowedRequestMethods.indexOf(data.method)) {
            handlers._users[data.method](data, callback);
            return;
        }
        callback(405); // Method not allowed
        return;
    }, 
    ping: function(data, callback){ // Ping request handler
        callback(200);
    }, 
    notFound: function(data, callback){ // Not found request handler 
        callback(404);
    }, 
};

// Container for Users Method Handlers
handlers._users = {}; 

// Users - get
handlers._users.get = function(data, callback){
    //
};
// Users - post
// Required fields - firstName, lastName, phone, password, tosAgreement
// Optional data none
handlers._users.post = function(data, callback){

    const firstName = typeof(data.payload.firstName) === 'string' && data.payload.firstName.trim().length > 0 
                        ? data.payload.firstName
                        : false;
    const lastName = typeof(data.payload.lastName) === 'string' && data.payload.lastName.trim().length > 0 
                        ? data.payload.lastName
                        : false;
    const phone = typeof(data.payload.phone) === 'string' && data.payload.phone.trim().length === 10 
                        ? data.payload.phone
                        : false;
    const password = typeof(data.payload.password) === 'string' && data.payload.password.trim().length > 0 
                        ? data.payload.password
                        : false;
    const tosAgreement = typeof(data.payload.tosAgreement) === 'number' && data.payload.tosAgreement === 1 
                        ? true
                        : false;

    if(firstName && lastName && phone && password && tosAgreement) {
        _data.read('users', phone, function(err, data){
            if(err) {
                // Has user password
                const hashedPassword = helpers.hash(password);
                if(hashedPassword) {
                    // Create User object
                    const userObject = {
                        firstName,
                        lastName,
                        phone,
                        hashedPassword,
                        tosAgreement
                    };

                    // Store User data
                    _data.create('users', phone, userObject, function(err){
                        if(!err) {
                            callback(200, {Success: 'User details saved'});
                        }
                        console.log(err);
                        callback(500, {Error: 'Could not create user'});
                    });
                } else {
                    callback(500, {Error: 'Could not hash user\'s password'});
                }
            } else {
                callback(400, {Error: 'User with that phone number already exists'});
            }
        });
    } else {
        callback(400, {Error: 'Missing required fields'});
    }
};
// Users - put
handlers._users.put = function(data, callback){
    //
};
// Users - delete
handlers._users.delete = function(data, callback){
    //
};

module.exports = handlers;