'use strict';

/**
 * Module dependencies.
 */

var fileRetrieval = require('./fileRetrieval.server.utility');

exports.convertCustomerFileToJSON = function(callback){
    fileRetrieval.retrieveCustomerFile(function(response){
        var arrayOfStringJSONObjects = response.split("\n"), arrayOfJSONObjects = [];
        arrayOfStringJSONObjects.forEach(function(stringObject){
            arrayOfJSONObjects.push(JSON.parse(stringObject));
        });
        callback(arrayOfJSONObjects);
    });
};
