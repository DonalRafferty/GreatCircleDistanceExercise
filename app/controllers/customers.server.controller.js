'use strict';

/**
 * Module dependencies.
 */
var haversine = require('./../utilities/haversine.server.utility');

exports.list = function (req, res) {
    haversine.getCustomerDistances(function (customers) {
        res.json(customers);
    });
};