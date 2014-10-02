/*global myApp*/
/*jslint node: true */

'use strict';

myApp.controller('EditProfilCtrl', ['$rootScope', '$scope', '$modalInstance', '$cookieStore', 'Restangular',
	function ($rootScope, $scope, $modalInstance, $cookieStore, Restangular) {

		$scope.user = angular.copy($rootScope.currentUser);
		$scope.user.password_secure = $scope.user.password;

		$scope.edit = function () {
			Restangular.one('clients', $scope.user.id).put($scope.user).then(function (result) {
				$rootScope.currentUser = result;
				$cookieStore.put("currentuser", $rootScope.currentUser);
				$modalInstance.close();
			}, function (result) {
				$scope.dataAlert = {
					message: result.data,
					type: 'danger'
				};
			});
		};

		$scope.remove = function () {
			Restangular.one('clients', $scope.user.id).remove().then(function (result) {
				delete $rootScope.currentUser;
				$modalInstance.close();
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