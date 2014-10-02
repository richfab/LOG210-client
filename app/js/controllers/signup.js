/*global myApp*/
/*jslint node: true */

'use strict';

myApp.controller('SignupCtrl', ['$rootScope', '$scope', '$modalInstance', '$cookieStore', 'Restangular',
	function AlertCtrl($rootScope, $scope, $modalInstance, $cookieStore, Restangular) {

		$scope.user = {firstname : "Firstname", lastname : "Lastname", phone : "123-456-7890", address : "Adresse", city : "City", zipcode : "123456", country : "Country", mail : "email" + Date.now() + "@em.com", password : "password", password_secure : "password"};
		$scope.completed = false;

		// Signup
		$scope.signup = function () {
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
		};

		// Close modal
		$scope.cancel = function () {
			$modalInstance.close();
		};
	}]);