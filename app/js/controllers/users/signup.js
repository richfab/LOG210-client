/*global myApp*/
/*jslint node: true */

'use strict';

myApp.controller('SignupCtrl', ['$rootScope', '$scope', '$modalInstance', '$cookieStore', 'Restangular',
	function AlertCtrl($rootScope, $scope, $modalInstance, $cookieStore, Restangular) {

        $scope.user = {};

		//for the tests
        //$scope.user = {firstname : "Firstname", lastname : "Lastname", phone : "123-456-7890", address : "Adresse", city : "City", zipcode : "123456", country_id : 1, mail : "email" + Date.now() + "@em.com", password : "password", password_secure : "password"};

        $scope.completed = false;

        // Get countries
        Restangular.all('countries').getList().then(function (result) {
            $scope.countries = result;
        }, function (result) {
            $scope.dataAlert = {
                message: result.data,
                type: 'danger'
            };
        });

		// Signup
		$scope.signup = function () {
			if ($scope.user.birthdate && $scope.user.birthdate != "") {
				$scope.user.birthdate = $scope.user.birthdate.toISOString();
			} else {
				delete $scope.user.birthdate;
			}
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

		// Datepicker functions
		$scope.clear = function () {
			$scope.dt = null;
		};
		$scope.open = function($event) {
			$event.preventDefault();
			$event.stopPropagation();

			$scope.opened = true;
		};

	}]);