'use strict';

var expect = require('chai').expect,
    request = require('supertest'),
    app = require('../../server'),
    agent = request.agent(app);

/**
 * Customer routes tests
 */
describe('Customer route tests', function() {

    it('should return the customer list', function(done) {
        agent.post('/customers/local')
            .send({})
            .expect(200)
            .end(function(custSaveErr, custSaveRes) {
                expect(custSaveRes.body).to.not.be.empty;
                expect(custSaveRes.body).to.be.ok;
                // Call the assertion callback
                done(custSaveErr);
            });
    });
    it('should return objects with latitude and longitude', function(done) {
        agent.post('/customers/local')
            .send({})
            .expect(200)
            .end(function(custSaveErr, custSaveRes) {
                expect(custSaveRes.body[0]).to.include.keys('longitude');
                expect(custSaveRes.body[0]).to.include.keys('latitude');
                // Call the assertion callback
                done(custSaveErr);
            });
    });
    it('should return objects with user_id and name', function(done) {
        agent.post('/customers/local')
            .send({})
            .expect(200)
            .end(function(custSaveErr, custSaveRes) {
                expect(custSaveRes.body[0]).to.include.keys('user_id');
                expect(custSaveRes.body[0]).to.include.keys('name');
                // Call the assertion callback
                done(custSaveErr);
            });
    });
    it('should return objects with distance', function(done) {
        agent.post('/customers/local')
            .send({})
            .expect(200)
            .end(function(custSaveErr, custSaveRes) {
                expect(custSaveRes.body[0]).to.include.keys('distance');
                // Call the assertion callback
                done(custSaveErr);
            });
    });

});