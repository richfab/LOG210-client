/*global myApp*/
/*jslint node: true */

'use strict';

myApp.controller('RestaurantListCtrl', ['$scope', '$rootScope', 'Restangular', '$modal',
	function ($scope, $rootScope, Restangular, $modal) {

		$rootScope.currentMenu = 'restaurants';

		Restangular.all("restaurants").getList().then(function (data) {
			$scope.restaurants = data;
		}, function () {

		});

		Restangular.one("restaurants", 1).get().then(function (data) {
			$scope.restaurant = data;
		}, function () {

		});

		$scope.addRestaurant = function () {

			var modalInstance = $modal.open({
				templateUrl: 'views/restaurants/add.html',
				controller: 'RestaurantAddCtrl'
			});

			modalInstance.result.then(function () {

			}, function () {

			});
		};
	}]);