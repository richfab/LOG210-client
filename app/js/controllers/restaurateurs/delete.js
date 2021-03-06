/*global myApp*/
/*jslint node: true */

'use strict';

myApp.controller('RestaurateurDeleteCtrl', ['$scope', '$modalInstance', 'Restangular', 'restaurateur',
	function ($scope, $modalInstance, Restangular, restaurateur) {

		$scope.restaurateur = restaurateur;

		$scope.delete = function () {
            Restangular.one('restaurateurs', $scope.restaurateur.id).remove().then(function (result) {
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