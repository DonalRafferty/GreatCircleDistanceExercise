'use strict';

/**
 * Module dependencies.
 */
var https = require('https');

/**
 * Helper function that retrieves the list of customers
 * from the url in String format.
 * The injectedCallback is used to asynchronously pass
 * the results to the next part of the chain.
 * @param injectedCallback
 */
exports.retrieveCustomerFile = function(injectedCallback){
    var options = { //options object for holding URL data
        host: 'https://gist.githubusercontent.com',
        path: '/brianw/19896c50afa89ad4dec3/raw/6c11047887a03483c50017c1d451667fd62a53ca/gistfile1.txt'
    };

    //Simple HTTP GET to retrieve and append the data to a String
    https.get(options.host + options.path, function(response){
        var str = '';

        //Another chunk of data has been received, so append it to `str`
        response.on('data', function (chunk) {
            str += chunk;
        });

        //the whole response has been received, so we just print it out here
        response.on('end', function () {
            injectedCallback(str); //Send the full String back via the callback
        });
    });
};

