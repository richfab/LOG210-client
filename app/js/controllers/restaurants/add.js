/*global myApp*/
/*jslint node: true */

'use strict';

myApp.controller('RestaurantAddCtrl', ['$scope', '$modalInstance', 'Restangular',
	function ($scope, $modalInstance, Restangular) {

		// Init restaurant
		$scope.restaurant = {};

		// Get restaurateurs
        Restangular.all('restaurateurs').getList().then(function (result) {
			$scope.restaurateurs = result;
        }, function (result) {
			// Add a data alert to show error message
            //$scope.dataAlert = result;
        });

		$scope.save = function () {
	        Restangular.all('restaurants').post($scope.restaurant).then(function (result) {
	            $modalInstance.close(result);
	        }, function (result) {
				// Add a data alert to show error message
	            //$scope.dataAlert = result;
	        });
		};

		$scope.cancel = function () {
			$modalInstance.close();
		};

	}]);