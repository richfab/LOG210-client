/*global myApp*/
/*jslint node: true */

'use strict';

myApp.controller('LoginCtrl', ['$rootScope', '$scope', '$modalInstance', '$cookieStore',
	function AlertCtrl($rootScope, $scope, $modalInstance, $cookieStore) {

		$scope.user = {};

		$scope.login = function () {
			if ($scope.user.mail == "entre" & $scope.user.password == "preneur") {
				$rootScope.currentUser = {firstname: "Entre", lastname: "Preneur", role: "Entrepreneur"};
				$cookieStore.put("currentuser", $rootScope.currentUser);
			}
			$modalInstance.close();
		};

		$scope.cancel = function () {
			$modalInstance.close();
		};
	}]);