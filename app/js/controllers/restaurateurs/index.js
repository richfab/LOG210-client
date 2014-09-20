/*global myApp*/
/*jslint node: true */

'use strict';

myApp.controller('RestaurateurListCtrl', ['$scope', '$rootScope', 'Restangular', '$modal',
	function ($scope, $rootScope, Restangular, $modal) {

		// Set current menu
		$rootScope.currentMenu = 'restaurateurs';

		// Update list
		$scope.updateList = function () {
			Restangular.all("restaurateurs").getList().then(function (data) {
				$scope.restaurateurs = data;
			}, function () {

			});
		};

		$scope.updateList();

		// ============================= Functions to manage =============================

		$scope.add = function () {
			$modal.open({
				templateUrl: 'views/restaurateurs/add.html',
				controller: 'RestaurateurAddCtrl'
			}).result.then(function (result) {
				if (result) {
					// Show message to warn user that the restaurat has been successfuly created
					$scope.updateList();
				}
			});
		};

		$scope.edit = function (restaurateur) {
			$modal.open({
				templateUrl: 'views/restaurateurs/edit.html',
				controller: 'RestaurateurEditCtrl',
				resolve: {
					restaurateur: function () {
						return restaurateur;
					}
				}
			}).result.then(function (result) {
				if (result) {
					// Show message to warn user that the restaurat has been successfuly created
					$scope.updateList();
				}
			});
		};

		$scope.delete = function (restaurateur) {
			$modal.open({
				templateUrl: 'views/restaurateurs/delete.html',
				controller: 'RestaurateurDeleteCtrl',
				resolve: {
					restaurateur: function () {
						return restaurateur;
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