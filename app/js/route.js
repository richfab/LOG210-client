/*global myApp*/
/*jslint node: true */

'use strict';

myApp.config(['$routeProvider', function ($routeProvider) {

	$routeProvider.when('/restaurants', {
		templateUrl: 'views/restaurants/index.html',
		controller: 'RestaurantListCtrl'
	});

	$routeProvider.when('/home', {
		templateUrl: 'views/home.html',
		controller: 'HomeViewCtrl'
	});

	$routeProvider.when('/about', {
		templateUrl: 'views/about.html',
		controller: 'AboutViewCtrl'
	});

	$routeProvider.when('/contact', {
		templateUrl: 'views/contact.html',
		controller: 'ContactViewCtrl'
	});

	$routeProvider.otherwise({redirectTo: '/home'});

}]);
