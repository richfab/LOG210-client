/*global myApp*/
/*jslint node: true */

'use strict';

myApp.controller('RestaurateurListCtrl', ['$scope', '$rootScope', 'Restangular', '$modal',
	function ($scope, $rootScope, Restangular, $modal) {

		// Set current menu
		$rootScope.currentMenu = null;

		// Update list
		$scope.updateList = function () {
			Restangular.all("restaurateurs").getList().then(function (data) {
				$scope.restaurateurs = data;
			}, function (result) {
				$scope.notifyMessage(result.data, "danger");
			});
		};

		$scope.updateList();

		// ============================= Functions to manage =============================

		$scope.add = function () {
			$modal.open({
				templateUrl: 'views/restaurateurs/add-edit.html',
				controller: 'RestaurateurAddCtrl'
			}).result.then(function (result) {
				if (result) {
					$scope.updateList();
					if (!result.restaurateur_id) {
						$scope.notifyMessage("Aucun restaurant assigné pour ce restaurateur", "warning");
					}
                    $scope.notifyMessage("Le restaurateur a bien été ajouté", "success");
				}
			});
		};

		$scope.edit = function (restaurateur) {
			$modal.open({
				templateUrl: 'views/restaurateurs/add-edit.html',
				controller: 'RestaurateurEditCtrl',
				resolve: {
					restaurateur: function () {
						return Restangular.copy(restaurateur);
					}
				}
			}).result.then(function (result) {
				if (result) {
					$scope.updateList();
                    $scope.notifyMessage("Le restaurateur a bien été modifié", "success");
				}
			});
		};

		$scope.remove = function (restaurateur) {
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
					$scope.updateList();
                    $scope.notifyMessage("Le restaurateur a bien été supprimé", "success");
				}
			});
		};

	}]);