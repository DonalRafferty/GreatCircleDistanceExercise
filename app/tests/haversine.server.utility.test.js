'use strict';

var expect = require('chai').expect,
    request = require('supertest'),
    app = require('../../server'),
    agent = request.agent(app),
    haversine = require('../utilities/haversine.server.utility'),
    rewire = require('rewire'),
    haversineMock, sortCustomersMock, closeEnoughToOfficeMock, deg2radMock, getDistanceFromLatLonInKmMock,
    distance;

/**
 * Haeversine utility tests
 */

describe('Haeversine tests', function () {

    beforeEach(function (done) {
        haversineMock = rewire('../utilities/haversine.server.utility');
        sortCustomersMock = haversineMock.__get__('sortCustomers');
        closeEnoughToOfficeMock = haversineMock.__get__('closeEnoughToOffice');
        deg2radMock = haversineMock.__get__('deg2rad');
        getDistanceFromLatLonInKmMock = haversineMock.__get__('getDistanceFromLatLonInKm');
        done();
    });

    describe('Positive tests', function () {

        beforeEach(function (done) {
            distance = 100;
            done();
        });

        it('should return the customer list', function (done) {
            haversine.getCustomerDistances(distance, function (completeCustomers) {
                expect(completeCustomers).to.not.be.empty;
                expect(completeCustomers).to.be.ok;
                done();
            });
        });
        it('should return the customer list with the calculated distances', function (done) {
            haversine.getCustomerDistances(distance, function (completeCustomers) {
                expect(completeCustomers[0]).to.include.keys('distance');
                done();
            });
        });
        it('should sort the customers by user_id in ascending order', function (done) {
            var mockCustArray = [{name: 'tester1', user_id: 4}, {name: 'tester2', user_id: 1}, {
                name: 'tester3',
                user_id: 3
            }, {name: 'tester4', user_id: 2}];
            sortCustomersMock(mockCustArray);
            expect(mockCustArray).to.deep.equal([{name: 'tester2', user_id: 1}, {
                name: 'tester4',
                user_id: 2
            }, {name: 'tester3', user_id: 3}, {name: 'tester1', user_id: 4}]);
            done();
        });
        it('closeEnoughToOffice function returns true if customer within distance', function (done) {
            var mockCustomer = {name: 'tester3', distance: 55}, mockDistance = 100;
            expect(closeEnoughToOfficeMock(mockCustomer, mockDistance)).to.equal(true);
            done();
        });
        it('deg2rad function turns a degree into radian', function (done) {
            var mockDegree = 1;
            expect(deg2radMock(mockDegree)).to.equal(0.017453292519943295);
            done();
        });
        it('getDistanceFromLatLonInKm function returns a calculated distance for two geo points', function (done) {
            expect(getDistanceFromLatLonInKmMock(53.2451022, -6.238335, 53.3381985, -6.2592576)).to.equal(10.4448258791762);
            done();
        });
    });
    describe('Negative tests', function () {

        beforeEach(function (done) {
            distance = undefined;
            done();
        });

        it('should return an empty array if distance is not supplied', function (done) {
            haversine.getCustomerDistances(distance, function (completeCustomers) {
                expect(completeCustomers).to.be.empty;
                done();
            });
        });
        it('closeEnoughToOffice function returns false if customer NOT within distance', function (done) {
            var mockCustomer = {name: 'tester3', distance: 105}, mockDistance = 100;
            expect(closeEnoughToOfficeMock(mockCustomer, mockDistance)).to.equal(false);
            done();
        });
        it('closeEnoughToOffice function returns false if no distance is supplied', function (done) {
            var mockCustomer = {name: 'tester3', distance: 105}, mockDistance = undefined;
            expect(closeEnoughToOfficeMock(mockCustomer, mockDistance)).to.equal(false);
            done();
        });
    });

});