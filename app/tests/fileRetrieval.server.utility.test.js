'use strict';

var expect = require('chai').expect,
    request = require('supertest'),
    app = require('../../server'),
    agent = request.agent(app),
    fileRetrieval = require('../utilities/fileRetrieval.server.utility');

/**
 * File retrieval utility tests
 */

describe('File retrieval utility tests', function () {

    it('should return the customer list', function (done) {
        fileRetrieval.retrieveCustomerFile(function (customers) {
            expect(customers).to.not.be.empty;
            expect(customers).to.be.ok;
            done();
        });
    });
    it('should return the customer list as a String', function (done) {
        fileRetrieval.retrieveCustomerFile(function (customers) {
            expect(typeof customers).to.equal('string');
            done();
        });
    });

});