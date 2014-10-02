/*global myApp*/
/*jslint node: true */

'use strict';

myApp.controller('RestaurateurAddCtrl', ['$scope', '$modalInstance', 'Restangular',
	function ($scope, $modalInstance, Restangular) {

		// Init restaurateur
		$scope.restaurateur = {};

        // Get restaurants
        Restangular.all('restaurants').getList().then(function (result) {
            $scope.restaurants = result;
        }, function (result) {
            $scope.dataAlert = {
                message: result.data,
                type: 'danger'
            };
        });

        // Get countries
        Restangular.all('countries').getList().then(function (result) {
            $scope.countries = result;
        }, function (result) {
            $scope.dataAlert = {
                message: result.data,
                type: 'danger'
            };
        });

		// Save restaurateur
		$scope.save = function () {
	        Restangular.all('restaurateurs').post($scope.restaurateur).then(function (result) {
	            $modalInstance.close(result);
	        }, function (result) {
                $scope.dataAlert = {
                    message: result.data,
                    type: 'danger'
                };
	        });
		};

		// Cancel restaurateur adding
		$scope.cancel = function () {
			$modalInstance.close();
		};

	}]);