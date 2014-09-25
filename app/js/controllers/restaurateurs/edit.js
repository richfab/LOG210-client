/*global myApp*/
/*jslint node: true */

'use strict';

myApp.controller('RestaurateurEditCtrl', ['$scope', '$modalInstance', 'Restangular', 'restaurateur',
	function ($scope, $modalInstance, Restangular, restaurateur) {

		// Get restaurateur from the list
		$scope.restaurateur = restaurateur;

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
            Restangular.one('restaurateurs', $scope.restaurateur.id).put($scope.restaurateur).then(function (result) {
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