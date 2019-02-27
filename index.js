/*
* Primary file for Node-url-checker Api
*
*/

// Dependencies
const http = require('http');
const https = require('https');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const config = require('./lib/config');
const fs = require('fs');
const handlers = require('./lib/handlers');
const helpers = require('./lib/helpers');


// Instantiate http server
const httpServer = http.createServer(function(req, res){
    unifiedServer(req, res);
});

// Start server and listen on port exported from config
httpServer.listen(config.httpPort, function(){
    console.log(`Listening on port http://localhost:${config.httpPort}`);
});

// Instantiate https server
const httpsServerOptions = {
    key: fs.readFileSync('./https/key.pem'),
    cert: fs.readFileSync('./https/cert.pem')
};
const httpsServer = https.createServer(httpsServerOptions, function(req, res){
    unifiedServer(req, res);
});

// Start server and listen on secure port exported from config
httpsServer.listen(config.httpsPort, function(){
    console.log(`Listening on port https://localhost:${config.httpsPort}`);
});

// Server login for http and https servers
const unifiedServer = function(req, res){
    // Get the url
    const parsedUrl = url.parse(req.url, true); // True to indicate query string parsing inclusive
    
    // Get the path
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, ''); //Clean url's by removing extra / at the end

    // Get the query string as an object
    const queryStringObject = parsedUrl.query;

    // Get http method
    const method = req.method.toLowerCase();

    // Get headers
    const headers = req.headers;

    // Get payload if any
    const decoder = new StringDecoder('utf-8');
    let buffer = '';
    req.on('data', function(data){
        buffer += decoder.write(data);
    });
    req.on('end', function(){
        buffer += decoder.end();

        // Choose the handler this request should go to. If one is not found the not found handler would be called
        const chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

        const data = {
            trimmedPath,
            method,
            headers,
            queryStringObject,
            payload: helpers.parseJsonToObject(buffer)
        };

        // Route the request to the router specified in the callback
        chosenHandler(data, function(statusCode, payload){
            // Use the status code defined by the handler or default to 200
            statusCode = typeof(statusCode) === 'number' ? statusCode : 200; 

            // Use the payload returned by our handler or default to an empty object
            payload = typeof(payload) === 'object' ? payload : {};

            // Convert payload to a string
            payloadString = JSON.stringify(payload);

            // Send a response
            console.log('Sending A Response');
            console.log(payloadString);
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(statusCode);
            res.end(payloadString);
            // Log the request path & headers
            // console.log('Response payload', payloadString, statusCode);
        });

    });
}

// Define a request router
const router = {
    users: handlers.users,
    ping: handlers.ping,
};
