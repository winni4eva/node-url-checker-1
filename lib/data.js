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

// Update data in file
lib.update = function(dir, file, data, callback){
    fs.open(`${lib.baseDir}${dir}/${file}.json`, 'r+', function(err, fileDescriptor){
        if(!err && fileDescriptor) {
            // Convert data to string
            const stringData = JSON.stringify(data);

            fs.truncate(fileDescriptor, function(err){
                if(!err) {
                    // Write to file and close it
                    fs.writeFile(fileDescriptor, stringData, function(err){
                        if(!err) {
                            // Close file
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
                    })
                } else {
                    callback(err);
                }
            })
        } else {
            callback(err);
        }
    })
}

// Delete file
lib.delete = function(dir, file, callback){
    fs.unlink(`${lib.baseDir}${dir}/${file}.json`, function(err){
        if(!err) {
            callback(false);
        } else {
            callback(err);
        }
    })
}

// Testing File Create @Delete
// _data.create('test','newFile', {adam: "winni"}, function(err){
//     console.log(err);
// });

// Testing File Read @Delete
// _data.read('test','newFile', function(err, data){
//     console.log(err);
//     console.log(data);
// });

// Testing File Update @Delete
// _data.update('test','newFile', {node: "guru"}, function(err){
//     console.log(err);
// });

// Testing File Delete @Delete
// _data.delete('test','newFile', function(err){
//     console.log(err);
// });

// Export library
module.exports = lib;
