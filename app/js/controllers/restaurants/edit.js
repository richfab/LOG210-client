/*global myApp*/
/*jslint node: true */

'use strict';

myApp.controller('RestaurantEditCtrl', ['$scope', '$modalInstance', 'Restangular', 'restaurant',
    function ($scope, $modalInstance, Restangular, restaurant) {

		// Get restaurant from the list
        $scope.restaurant = restaurant;

        // Get restaurateurs
        Restangular.all('restaurateurs').getList().then(function (result) {
            $scope.restaurateurs = result;
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

		// Save restaurant
        $scope.save = function () {

            // Test whether restaurateur id is integer
            if ($scope.restaurant.restaurateur_id === null) {
                delete $scope.restaurant.restaurateur_id;
            }

			// Request server to update restaurant
            Restangular.one('restaurants', $scope.restaurant.id).put($scope.restaurant).then(function (result) {
                $modalInstance.close(result);
            }, function (result) {
                $scope.dataAlert = {
                    message: result.data,
                    type: 'danger'
                };
            });
        };

		// Cancel restaurant editing
        $scope.cancel = function () {
			$modalInstance.close();
        };

    }]);