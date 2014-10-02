/*global myApp*/
/*jslint node: true */

'use strict';

myApp.controller('LoginCtrl', ['$rootScope', '$scope', '$modalInstance', '$cookieStore', 'Restangular', 'user',
	function ($rootScope, $scope, $modalInstance, $cookieStore, Restangular, user) {

		if (user != null) {
			$scope.user = user;
		} else {
			$scope.user = {};
		}

		$scope.login = function () {
	        Restangular.all('accesstokens').post($scope.user).then(function (result) {
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

		$scope.cancel = function () {
			$modalInstance.close();
		};
	}]);