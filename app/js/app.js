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

// Run when application is launched
myApp.run(['$rootScope', '$modal', '$cookieStore', "$location",
	function ($rootScope, $modal, $cookieStore, $location) {

		// Set current menu
		$rootScope.currentMenu = 'home';

		// Check if a user is connected from the cookies
		$rootScope.currentUser = $cookieStore.get("currentuser");

		// Signup modal
		$rootScope.signup = function () {
			$modal.open({
				templateUrl: 'views/signup.html',
				controller: 'SignupCtrl'
			});
		};

		// Login modal
		$rootScope.login = function (user) {
			$modal.open({
				templateUrl: 'views/login.html',
				controller: 'LoginCtrl',
				size: "sm",
				resolve: {
					user: function () {
						return user;
					}
				}
			}).result.then(function (result) {
				if (result === true) {
					$rootScope.notifyMessage("Connexion effectuée.", "info");
				}
			});
		};

		// Logout
		$rootScope.logout = function () {
			$rootScope.notifyMessage("Deconnexion effectuée", "info");
			$rootScope.currentUser = null;
			$cookieStore.remove("currentuser");
			$location.path("/");
		};

		// Redirection
        $rootScope.$on("$routeChangeStart", function (event, current, next) {
			if ($location.path().match("/admin/")) { // or with current.$$route.originalPath
				if ($rootScope.currentUser == null || $rootScope.currentUser.type != "entrepreneur") {
					$location.path("/");
				}
			}
        });

	}]);
