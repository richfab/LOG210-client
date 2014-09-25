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
myApp.run(['$rootScope', '$modal', '$cookieStore',
	function ($rootScope, $modal, $cookieStore) {

		// Set current menu
		$rootScope.currentMenu = 'home';

		// Check if a user is connected
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

		$rootScope.logout = function () {
			$rootScope.currentUser = null;
			$cookieStore.remove("currentuser");
		}
	}]);