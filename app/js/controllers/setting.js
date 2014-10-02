/*global myApp*/
/*jslint node: true */

'use strict';

myApp.controller('EditProfilCtrl', ['$rootScope', '$scope', '$cookieStore', 'Restangular',
	function ($rootScope, $scope, $cookieStore, Restangular) {
        
        $rootScope.currentMenu = 'settings';

		// Get user
		$scope.user = angular.copy($rootScope.currentUser);
		$scope.user.password_secure = $scope.user.password;

		// Edit profil
		$scope.edit = function () {
			Restangular.one($scope.user.type + 's', $scope.user.id).put($scope.user).then(function (result) {
				$rootScope.currentUser = result;
				$cookieStore.put("currentuser", $rootScope.currentUser);
                $rootScope.notifyMessage("Informations mises à jour avec succès.", "info");
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
				$rootScope.logout();
                $rootScope.notifyMessage("Suppression du profil effectuée.", "info");
			}, function (result) {
				$scope.dataAlert = {
					message: result.data,
					type: 'danger'
				};
			});
		};

	}]);