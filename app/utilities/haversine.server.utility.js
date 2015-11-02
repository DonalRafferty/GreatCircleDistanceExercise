'use strict';

/**
 * Module dependencies.
 */

var fileToJSON = require('./fileToJSON.server.utility');

exports.getCustomerDistances = function (callback) {
    fileToJSON.convertCustomerFileToJSON(function (jsonData) {
        var closeCustomers = [];
        jsonData.forEach(function (jsonObject) {
            jsonObject.distance = getDistanceFromLatLonInKm(jsonObject.latitude, jsonObject.longitude, 53.3381985, -6.2592576);
            if(closeEnoughToOffice(jsonObject, 100)){
                closeCustomers.push(jsonObject);
            }
        });
        sortCustomers(closeCustomers);
        callback(closeCustomers);
    });
};

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180)
}

function closeEnoughToOffice(customer, distanceFrom) {
    if (customer.distance < distanceFrom) {
        return true;
    } else {
        return false;
    }
}

function sortCustomers(customersArray){
    customersArray.sort(function (a, b) {
        if (a.user_id > b.user_id) {
            return 1;
        }
        if (a.user_id < b.user_id) {
            return -1;
        }
        // a must be equal to b
        return 0;
    });
}

