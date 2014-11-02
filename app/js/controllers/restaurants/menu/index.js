/*global myApp*/
/*jslint node: true */

'use strict';

myApp.controller('MenuRestaurantListCtrl', ['$scope', '$routeParams', '$rootScope', 'Restangular', '$modal',
	function ($scope, $routeParams, $rootScope, Restangular, $modal) {

		// Set current menu
		$rootScope.currentMenu = 'restaurants';
		
		// Get restaurant name
		Restangular.one("restaurants", $routeParams.restaurantId).get().then(function (data) {
			$scope.restaurant = data;
		}, function (result) {
			$scope.notifyMessage(result.data, "danger");
		});
		
		// Update list
		$scope.updateList = function () {
			Restangular.one("restaurants", $routeParams.restaurantId).all('menus').getList().then(function (data) {
				$scope.menus = data;
			}, function (result) {
				$scope.notifyMessage(result.data, "danger");
			});
		};

		$scope.updateList();
		

	}]);