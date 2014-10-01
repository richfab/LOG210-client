/*global myApp*/
/*jslint node: true */

'use strict';

myApp.controller('SigninCtrl', ['$rootScope', '$scope', '$modalInstance', '$cookieStore',
	function AlertCtrl($rootScope, $scope, $modalInstance, $cookieStore) {

		$scope.user = {};

		$scope.signin = function () {
			$modalInstance.close();
		};

		$scope.cancel = function () {
			$modalInstance.close();
		};
	}]);