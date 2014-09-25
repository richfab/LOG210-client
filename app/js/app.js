/*global myApp, angular*/
/*jslint node: true */

'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
	'ngRoute',
	'restangular',
	'ui.bootstrap'
]);

// Configuration of Restangular
myApp.config(function (RestangularProvider) {
	RestangularProvider.setBaseUrl('http://localhost:5000');
});

// Run when application is launched
myApp.run(['$rootScope', '$modal',
	function ($rootScope, $modal) {

		// Set current menu
		$rootScope.currentMenu = 'home';

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
	}]);