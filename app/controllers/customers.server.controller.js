'use strict';

/**
 * Module dependencies.
 */
var haversine = require('./../utilities/haversine.server.utility'); //Reference the haversine utility class

/**
 * A function that gets called from the /customers/local
 * API route, if a distance is supplied in the body of
 * the request then perform the haversine equation
 * on the retrieved last of customers
 * else
 * send back a generic error message
 * @param req
 * @param res
 * @returns {*}
 */
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