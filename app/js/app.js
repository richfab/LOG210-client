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
myApp.run(['$rootScope',
	function ($rootScope) {
		$rootScope.currentMenu = 'home';
	}]);