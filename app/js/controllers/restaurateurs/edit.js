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
            Restangular.one('restaurateurs', $scope.restaurateur.id).put($scope.restaurateur).then(function (result) {
                $modalInstance.close(result);
            }, function (result) {
                $scope.dataAlert = {
                    message: result.data,
                    type: 'danger'
                };
            });
		};

		// Cancel restaurateur editing
		$scope.cancel = function () {
			$modalInstance.close();
		};

		// Datepicker functions
		$scope.clear = function () {
			$scope.dt = null;
		};
		$scope.open = function($event) {
			$event.preventDefault();
			$event.stopPropagation();

			$scope.opened = true;
		};

	}]);