/*global myApp*/
/*jslint node: true */

'use strict';

myApp.controller('RestaurantDeleteCtrl', ['$scope', '$modalInstance', 'Restangular', 'restaurant',
	function ($scope, $modalInstance, Restangular, restaurant) {

		$scope.restaurant = restaurant;

		$scope.delete = function () {
            Restangular.one('restaurants', $scope.restaurant.id).remove().then(function (result) {
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