/*global myApp*/
/*jslint node: true */

'use strict';

myApp.controller('RestaurantListCtrl', ['$scope', '$rootScope', 'Restangular', '$modal',
	function ($scope, $rootScope, Restangular, $modal) {

		// Set current menu
		$rootScope.currentMenu = 'restaurants';

		// Update list
		$scope.updateList = function () {
			Restangular.all("restaurants").getList().then(function (data) {
				$scope.restaurants = data;
			}, function () {

			});
		};

		$scope.updateList();

		// Example for request one element
		/*
		Restangular.one("restaurants", 1).get().then(function (data) {
			$scope.restaurant = data;
		}, function () {

		});
		*/

		// ============================= Functions to manage =============================

		$scope.add = function () {
			$modal.open({
				templateUrl: 'views/restaurants/add-edit.html',
				controller: 'RestaurantAddCtrl'
			}).result.then(function (result) {
				if (result) {
					// Show message to warn user that the restaurat has been successfuly created
					$scope.updateList();
				}
			});
		};

		$scope.edit = function (restaurant) {
			$modal.open({
				templateUrl: 'views/restaurants/add-edit.html',
				controller: 'RestaurantEditCtrl',
				resolve: {
					restaurant: function () {
						return restaurant;
					}
				}
			}).result.then(function (result) {
				if (result) {
					// Show message to warn user that the restaurat has been successfuly created
					$scope.updateList();
				}
			});
		};

		$scope.delete = function (restaurant) {
			$modal.open({
				templateUrl: 'views/restaurants/delete.html',
				controller: 'RestaurantDeleteCtrl',
				resolve: {
					restaurant: function () {
						return restaurant;
					}
				}
			}).result.then(function (result) {
				if (result) {
					// Show message to warn user that the restaurat has been successfuly created
					$scope.updateList();
				}
			});
		};

	}]);