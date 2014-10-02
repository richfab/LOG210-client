/*global myApp*/
/*jslint node: true */

'use strict';

myApp.controller('LoginCtrl', ['$rootScope', '$scope', '$modalInstance', '$cookieStore', 'Restangular',
	function AlertCtrl($rootScope, $scope, $modalInstance, $cookieStore, Restangular) {

		$scope.user = {};

		$scope.login = function () {
	        Restangular.all('accesstokens').post($scope.user).then(function (result) {
				$rootScope.currentUser = result;
				$cookieStore.put("currentuser", $rootScope.currentUser);
				$modalInstance.close();
	        }, function (result) {
                console.log(result);
	        });
		};

		$scope.cancel = function () {
			$modalInstance.close();
		};
	}]);