/*global myApp*/
/*jslint node: true */

'use strict';

myApp.controller('SigninCtrl', ['$rootScope', '$scope', '$modalInstance', '$cookieStore', 'Restangular',
	function AlertCtrl($rootScope, $scope, $modalInstance, $cookieStore, Restangular) {

		$scope.user = {};

		$scope.signin = function () {
	        Restangular.all('clients').post($scope.user).then(function (result) {
				$modalInstance.close();
	        }, function (result) {
                console.log(result);
	        });
		};

		$scope.cancel = function () {
			$modalInstance.close();
		};
	}]);