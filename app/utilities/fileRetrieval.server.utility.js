'use strict';

/**
 * Module dependencies.
 */
var https = require('https');

exports.retrieveCustomerFile = function(injectedCallback){
    var options = {
        host: 'https://gist.githubusercontent.com',
        path: '/brianw/19896c50afa89ad4dec3/raw/6c11047887a03483c50017c1d451667fd62a53ca/gistfile1.txt'
    };

    https.get(options.host + options.path, function(response){
        var str = '';

        //another chunk of data has been received, so append it to `str`
        response.on('data', function (chunk) {
            str += chunk;
        });

        //the whole response has been received, so we just print it out here
        response.on('end', function () {
            injectedCallback(str);
        });
    });
};

