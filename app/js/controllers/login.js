/*global myApp*/
/*jslint node: true */

'use strict';

myApp.controller('LoginCtrl', ['$rootScope', '$scope', '$modalInstance',
	function AlertCtrl($rootScope, $scope, $modalInstance) {

		$scope.user = {};

		$scope.login = function () {
			if ($scope.user.mail == "entre" & $scope.user.password == "preneur") {
				$rootScope.currentUser = {firstname: "Entre", lastname: "Preneur", role: "Entrepreneur"};
			}
			$modalInstance.close();
		};

		$scope.cancel = function () {
			$modalInstance.close();
		};
	}]);