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

		// ============================= Functions to manage =============================

		$scope.add = function () {
			$modal.open({
				templateUrl: 'views/restaurants/add-edit.html',
				controller: 'RestaurantAddCtrl'
			}).result.then(function (result) {
				if (result) {
					$scope.updateList();
                    $scope.notifyMessage("Le restaurant a bien été ajouté", "info");
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
					$scope.updateList();
					$scope.notifyMessage("Le restaurant a bien été modifié", "info");
				}
			});
		};

		$scope.remove = function (restaurant) {
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
					$scope.updateList();
                    $scope.notifyMessage("Le restaurant a bien été supprimé", "info");
				}
			});
		};

	}]);