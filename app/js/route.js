/*global myApp*/
/*jslint node: true */

'use strict';

myApp.config(['$routeProvider', function ($routeProvider) {

	$routeProvider.when('/home', {
		templateUrl: 'views/home.html',
		controller: 'HomeViewCtrl'
	});

	$routeProvider.when('/restaurants', {
		templateUrl: 'views/restaurants/index_user.html',
		controller: 'RestaurantListUserCtrl'
	});

	$routeProvider.when('/admin/restaurants', {
		templateUrl: 'views/restaurants/index.html',
		controller: 'RestaurantListCtrl'
	});

	$routeProvider.when('/admin/restaurateurs', {
		templateUrl: 'views/restaurateurs/index.html',
		controller: 'RestaurateurListCtrl'
	});

	$routeProvider.when('/about', {
		templateUrl: 'views/about.html',
		controller: 'AboutViewCtrl'
	});

	$routeProvider.when('/contact', {
		templateUrl: 'views/contact.html',
		controller: 'ContactViewCtrl'
	});
    
    $routeProvider.when('/settings', {
        templateUrl: 'views/setting.html',
        controller: 'EditProfilCtrl'
    });

	$routeProvider.otherwise({redirectTo: '/home'});

}]);
