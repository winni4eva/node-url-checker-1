/*
* Primary file for Node-url-checker Api
*
*/

// Dependencies
const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

// The server should respond to all requests with as tring
const server = http.createServer(function(req, res){
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

        // Send a response
        res.end('Hello World!');

        // Log the request path & headers
        // console.log(`Request was recieved on path ${trimmedPath} with method: ${method} and query string params`, queryStringObject);
        console.log('Request payload', buffer);
    });
})

// Start server and listen on port 3000
server.listen(3000, function(){
    console.log('Listening on port http://localhost:3000');
});
