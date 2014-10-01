/*global myApp, angular*/
/*jslint node: true */

'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
	'ngRoute',
	'restangular',
	'ui.bootstrap',
	'ngCookies'
]);

// Configuration of Restangular
myApp.config(function (RestangularProvider) {
	RestangularProvider.setBaseUrl('http://localhost:5000');
});

// Run when application is launched
myApp.run(['$rootScope', '$modal', '$cookieStore', "$location",
	function ($rootScope, $modal, $cookieStore, $location) {

		// Set current menu
		$rootScope.currentMenu = 'home';

		// Check if a user is connected from the cookies
		$rootScope.currentUser = $cookieStore.get("currentuser");

		// Login modal
		$rootScope.login = function () {
			$modal.open({
				templateUrl: 'views/login.html',
				controller: 'LoginCtrl',
				size: "sm"
			}).result.then(function (result) {
				// Message
				// Show a welcome message or a notification
			});
		};

		// Signin modal
		$rootScope.signin = function () {
			$modal.open({
				templateUrl: 'views/signin.html',
				controller: 'SigninCtrl'
			}).result.then(function (result) {
				// Message
				// Show a welcome message or a notification
			});
		};

		// Logout
		$rootScope.logout = function () {
			$rootScope.currentUser = null;
			$cookieStore.remove("currentuser");
			$location.path("/");
		}

		// Check page
        $rootScope.$on("$routeChangeStart", function (event, current, next) {
			if ($location.path().match("/admin/")) { // or with current.$$route.originalPath
				if ($rootScope.currentUser == null || $rootScope.currentUser.firstname != "Entre") {
					// Change the condition by role instead of firstname when we will know the role of user
					$location.path("/");
				}
			}
        });

	}]);