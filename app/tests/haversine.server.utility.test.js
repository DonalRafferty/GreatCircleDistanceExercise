'use strict';

var expect = require('chai').expect,
    request = require('supertest'),
    app = require('../../server'),
    agent = request.agent(app),
    haversine = require('../utilities/haversine.server.utility');

/**
 * Haeversine utility tests
 */

describe('Haeversine tests', function () {

    it('should return the customer list', function (done) {
        haversine.getCustomerDistances(function (completeCustomers) {
            expect(completeCustomers).to.not.be.empty;
            expect(completeCustomers).to.be.ok;
            done();
        });
    });
    it('should return the customer list with the calculated distances', function (done) {
        haversine.getCustomerDistances(function (completeCustomers) {
            expect(completeCustomers[0]).to.include.keys('distance');
            done();
        });
    });

});