/*
* Library for storing and editing data
*
*/

// Dependencies
const fs = require('fs');
const path = require('path');

// Conatiner for exported module
var lib = {};

// Base directory of the data filder
lib.baseDir = path.join(__dirname, '/../.data/');

// Write data to a file
lib.create = function(dir, file, data, callback){
    // Create sub dir if it does not exist
    if (!fs.existsSync(`${lib.baseDir}${dir}/`)){
        fs.mkdirSync(`${lib.baseDir}${dir}/`);
    }
    // Open file for writing
    fs.open(`${lib.baseDir}${dir}/${file}.json`, 'wx', function(err, fileDescriptor){
        if(!err && fileDescriptor) {
            // Convert data to string
            const stringData = JSON.stringify(data);

            // Write to file and close it
            fs.writeFile(fileDescriptor, stringData, function(err){
                if(!err) {
                    fs.close(fileDescriptor, function(err){
                        if(!err) {
                            callback(false);
                        } else {
                            callback(err);
                        }
                    });
                } else {
                    callback(err);
                }
            });
        } else {
            callback(err);
        }
    });
};

// Read data from file
lib.read = function(dir, file, callback){
    fs.readFile(`${lib.baseDir}${dir}/${file}.json`, 'utf-8', function(err, data){
        callback(err, data);
    });
}

module.exports = lib;
