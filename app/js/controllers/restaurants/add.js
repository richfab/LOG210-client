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

			// Request server to add new restaurant
            Restangular.all('restaurants').post($scope.restaurant).then(function (result) {
                $modalInstance.close(result);
            }, function (result) {
                $scope.dataAlert = {
                    message: result.data,
                    type: 'danger'
                };
            });
        };

		// Cancel restaurant adding
        $scope.cancel = function () {
            $modalInstance.close();
        };

    }]);