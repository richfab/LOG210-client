/*global myApp*/
/*jslint node: true */

'use strict';

myApp.controller('EditProfilCtrl', ['$rootScope', '$scope', '$modal', '$cookieStore', 'Restangular',
	function ($rootScope, $scope, $modal, $cookieStore, Restangular) {
        
        $rootScope.currentMenu = 'settings';

		// Get user
		$scope.user = angular.copy($rootScope.currentUser);
		$scope.user.password_secure = $scope.user.password;
        
        // Get countries
        Restangular.all('countries').getList().then(function (result) {
            $scope.countries = result;
        }, function (result) {
            $scope.dataAlert = {
                message: result.data,
                type: 'danger'
            };
        });

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
        $scope.remove = function (user) {
			$modal.open({
				templateUrl: 'views/users/delete.html',
				controller: 'UserDeleteCtrl',
				resolve: {
					user: function () {
						return user;
					}
				}
			});
		};

	}]);