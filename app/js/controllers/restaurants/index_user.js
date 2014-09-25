/*global myApp*/
/*jslint node: true */

'use strict';

myApp.controller('RestaurantListUserCtrl', ['$scope', '$rootScope', 'Restangular', '$modal',
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
	}]);