/*global myApp*/
/*jslint node: true */

'use strict';

myApp.controller('LoginCtrl', ['$rootScope', '$scope', '$modalInstance', '$cookieStore', 'Restangular', 'user',
	function ($rootScope, $scope, $modalInstance, $cookieStore, Restangular, user) {

		// Get user from signin page
		if (user != null) {
			$scope.user = user;
		} else {
			$scope.user = {};
		}

		// Login
		$scope.login = function () {
	        Restangular.all('accesstokens').post($scope.user).then(function (result) {
				$rootScope.currentUser = result;
				$cookieStore.put("currentuser", $rootScope.currentUser);
				$modalInstance.close(true);
	        }, function (result) {
                $scope.dataAlert = {
                    message: result.data,
                    type: 'danger'
                };
	        });
		};

		// Close modal
		$scope.cancel = function () {
			$modalInstance.close(false);
		};
	}]);