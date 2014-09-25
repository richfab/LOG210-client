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

		$scope.cancel = function () {
			$modalInstance.close();
		};

	}]);