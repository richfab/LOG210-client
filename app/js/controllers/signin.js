/*global myApp*/
/*jslint node: true */

'use strict';

myApp.controller('SigninCtrl', ['$rootScope', '$scope', '$modalInstance', '$cookieStore', 'Restangular',
	function AlertCtrl($rootScope, $scope, $modalInstance, $cookieStore, Restangular) {

		$scope.user = {};
		$scope.completed = false;

		// Signin
		$scope.signin = function () {
	        Restangular.all('clients').post($scope.user).then(function (result) {
				$scope.completed = true;
	        }, function (result) {
                $scope.dataAlert = {
                    message: result.data,
                    type: 'danger'
                };
	        });
		};

		// Redirect to login modal
		$scope.login = function () {
			$modalInstance.close();
			$rootScope.login($scope.user);
		}

		// Close modal
		$scope.cancel = function () {
			$modalInstance.close();
		};
	}]);