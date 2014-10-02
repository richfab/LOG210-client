/*global myApp*/
/*jslint node: true */

'use strict';

myApp.controller('UserDeleteCtrl', ['$scope', '$rootScope', '$modalInstance', 'Restangular', 'user',
	function ($scope, $rootScope, $modalInstance, Restangular, user) {

		$scope.user = user;

		$scope.remove = function () {
            Restangular.one($scope.user.type + 's', $scope.user.id).remove().then(function (result) {
                $modalInstance.close(result);
                $rootScope.logout();
                $rootScope.notifyMessage("Suppression du profil effectuée.", "info");
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