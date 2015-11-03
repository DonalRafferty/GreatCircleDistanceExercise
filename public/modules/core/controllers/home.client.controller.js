'use strict';

angular.module('core').controller('HomeController', ['$scope', '$http',
	function($scope, $http) {

        $scope.getNearestCustomers = function(){
            $http.post('/customers/local', {distance: $scope.searchDistance}).success(function (response) {
                $scope.customers = response;
            }).error(function (response) {
                $scope.error = 'Something went wrong';
            });
        }
	}
]);
