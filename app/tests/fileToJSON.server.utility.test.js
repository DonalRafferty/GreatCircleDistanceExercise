'use strict';

var expect = require('chai').expect,
    request = require('supertest'),
    app = require('../../server'),
    agent = request.agent(app),
    fileToJSON = require('../utilities/fileToJSON.server.utility');

/**
 * File ro JSON utility tests
 */

describe('File to JSON tests', function () {

    it('should return the customer list', function (done) {
        fileToJSON.convertCustomerFileToJSON(function (customersJSON) {
            expect(customersJSON).to.not.be.empty;
            expect(customersJSON).to.be.ok;
            done();
        });
    });
    it('should return the customer list as JSON', function (done) {
        fileToJSON.convertCustomerFileToJSON(function (customersJSON) {
            expect(typeof customersJSON).to.equal('object');
            done();
        });
    });

});