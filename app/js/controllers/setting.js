/*global myApp*/
/*jslint node: true */

'use strict';

myApp.controller('EditProfilCtrl', ['$rootScope', '$scope', '$modalInstance', '$cookieStore', 'Restangular',
	function ($rootScope, $scope, $modalInstance, $cookieStore, Restangular) {

		// Get user
		$scope.user = angular.copy($rootScope.currentUser);
		$scope.user.password_secure = $scope.user.password;

		// Edit profil
		$scope.edit = function () {
			Restangular.one($scope.user.type + 's', $scope.user.id).put($scope.user).then(function (result) {
				$rootScope.currentUser = result;
				$cookieStore.put("currentuser", $rootScope.currentUser);
				$modalInstance.close('edit');
			}, function (result) {
				$scope.dataAlert = {
					message: result.data,
					type: 'danger'
				};
			});
		};

		// Remove profil
		$scope.remove = function () {
			Restangular.one($scope.user.type + 's', $scope.user.id).remove().then(function (result) {
				// Remove cookie and current user from rootScope
				$cookieStore.remove('currentUser');
				$rootScope.currentUser = null;
				$modalInstance.close('remove');
			}, function (result) {
				$scope.dataAlert = {
					message: result.data,
					type: 'danger'
				};
			});
		}

		$scope.cancel = function () {
			$modalInstance.close();
		};

	}]);