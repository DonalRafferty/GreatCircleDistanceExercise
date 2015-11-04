'use strict';

/**
 * Module dependencies.
 */

var fileToJSON = require('./fileToJSON.server.utility');

/**
 * Exposed function for starting the chain to retrieve the customers
 * and then apply the haversine formula on each customer to find out
 * their given distance from the supplied point
 * @param distance
 * @param callback
 */
exports.getCustomerDistances = function (distance, callback) {
    fileToJSON.convertCustomerFileToJSON(function (jsonData) {
        var closeCustomers = [];
        jsonData.forEach(function (jsonObject) {
            jsonObject.distance = getDistanceFromLatLonInKm(jsonObject.latitude, jsonObject.longitude, 53.3381985, -6.2592576); //TODO: Currently hardcoded the centre point to calc distance from, make this dynamic
            if(closeEnoughToOffice(jsonObject, distance)){ //only interested in customers close enough to the given point
                closeCustomers.push(jsonObject);
            }
        });
        sortCustomers(closeCustomers); //sort the array
        callback(closeCustomers); //send data back to controller
    });
};

/**
 * Helper function that performs the haversine calculation
 * For more info on the formula - https://en.wikipedia.org/wiki/Haversine_formula
 * Accurate to within 0.5%
 * @param latitude1
 * @param longitude1
 * @param latitude2
 * @param longitude2
 * @returns {number}
 */
function getDistanceFromLatLonInKm(latitude1, longitude1, latitude2, longitude2) {
    var EarthRadius = 6371; // Radius of the earth in km
    var degreeLatitude = deg2rad(latitude2 - latitude1);  // deg2rad below
    var degreeLongitude = deg2rad(longitude2 - longitude1);
    var equationPartA = Math.sin(degreeLatitude / 2) * Math.sin(degreeLatitude / 2) +
        Math.cos(deg2rad(latitude1)) * Math.cos(deg2rad(latitude2)) *
        Math.sin(degreeLongitude / 2) * Math.sin(degreeLongitude / 2);
    var equationPartB = 2 * Math.atan2(Math.sqrt(equationPartA), Math.sqrt(1 - equationPartA));
    var distance = EarthRadius * equationPartB; // Distance in km
    return distance;
}

/**
 * Helper function to turn degress into radians
 * @param deg
 * @returns {number}
 */
function deg2rad(deg) {
    return deg * (Math.PI / 180)
}

/**
 * Helper function for checking if the calculated distance for
 * a given customer is within the range supplied
 * @param customer
 * @param distanceFrom
 * @returns {boolean}
 */
function closeEnoughToOffice(customer, distanceFrom) {
    if (customer.distance < distanceFrom) {
        return true;
    } else {
        return false;
    }
}

/**
 * Helper function to sort the array of customers by user_id in ascending order
 * @param customersArray
 */
function sortCustomers(customersArray){
    customersArray.sort(function (customerA, customerB) {
        if (customerA.user_id > customerB.user_id) {
            return 1;
        }
        if (customerA.user_id < customerB.user_id) {
            return -1;
        }
        // customer a must be equal to customer b
        return 0;
    });
}

