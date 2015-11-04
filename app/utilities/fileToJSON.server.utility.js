'use strict';

/**
 * Module dependencies.
 */

var fileRetrieval = require('./fileRetrieval.server.utility');

/**
 * A simple helper function that turns the String of cusomters recieved from the
 * fileRetrieval helper class in JSON.
 * Given a callback so it can send the JSON array to the haversine helper class
 * @param callback
 */
exports.convertCustomerFileToJSON = function(callback){
    fileRetrieval.retrieveCustomerFile(function(response){
        var arrayOfStringJSONObjects = response.split("\n"), arrayOfJSONObjects = [];
        arrayOfStringJSONObjects.forEach(function(stringObject){
            arrayOfJSONObjects.push(JSON.parse(stringObject));
        });
        callback(arrayOfJSONObjects);
    });
};
