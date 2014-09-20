/*global myApp*/
/*jslint node: true */

'use strict';

myApp.controller('RestaurateurAddCtrl', ['$scope', '$modalInstance', 'Restangular',
	function ($scope, $modalInstance, Restangular) {

		// Init restaurateur
		$scope.restaurateur = {};

		$scope.save = function () {
	        Restangular.all('restaurateurs').post($scope.restaurateur).then(function (result) {
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