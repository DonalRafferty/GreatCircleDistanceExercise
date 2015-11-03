'use strict';

/**
 * Module dependencies.
 */
var haversine = require('./../utilities/haversine.server.utility');

exports.list = function (req, res) {
    if(req.body.distance){
        haversine.getCustomerDistances(req.body.distance, function (customers) {
            res.jsonp(customers);
        });
    }else{
        return res.status(400).send({
            message: 'Please supply a distance'
        });
    }
};