/*global myApp*/
/*jslint node: true */

'use strict';

myApp.controller('RestaurateurEditCtrl', ['$scope', '$modalInstance', 'Restangular', 'restaurateur',
	function ($scope, $modalInstance, Restangular, restaurateur) {

		$scope.restaurateur = restaurateur;

		$scope.save = function () {
            Restangular.one('restaurateurs', $scope.restaurateur.id).put($scope.restaurateur).then(function (result) {
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