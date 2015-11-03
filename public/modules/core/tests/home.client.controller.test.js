'use strict';

(function() {
    describe('HomeController', function() {
        //Initialize global variables
        var scope,
            HomeController,
            exampleUser,
            $httpBackend;

        // Load the main application module
        beforeEach(module(ApplicationConfiguration.applicationModuleName));

        beforeEach(inject(function($controller, $rootScope, _$httpBackend_) {
            scope = $rootScope.$new();

            // Point global variables to injected services
            $httpBackend = _$httpBackend_;

            HomeController = $controller('HomeController', {
                $scope: scope
            });

            exampleUser = { latitude: '53.2451022',
                user_id: 4,
                name: 'Ian Kehoe',
                longitude: '-6.238335',
                distance: 10.4448258791762 };

        }));

        it('should retrieve the list of customers', function() {
            // Test expected POST request
            $httpBackend.expectPOST('/customers/local').respond(200, [exampleUser]);

            scope.getNearestCustomers();
            $httpBackend.flush();

            // Test scope value
            expect(scope.customers).toEqual([exampleUser]);
        });
    });
})();