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
	
	$routeProvider.when('/restaurants/:restaurantId/menus', {
		templateUrl: 'views/restaurants/menu/index.html',
		controller: 'MenuRestaurantListCtrl'
	});

	$routeProvider.when('/admin/restaurants', {
		templateUrl: 'views/restaurants/index.html',
		controller: 'RestaurantListCtrl'
	});

	$routeProvider.when('/admin/restaurateurs', {
		templateUrl: 'views/restaurateurs/index.html',
		controller: 'RestaurateurListCtrl'
	});
	
	$routeProvider.when('/menus', {
		templateUrl: 'views/menus/index.html',
		controller: 'MenuListCtrl'
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
	
    $routeProvider.when('/cart', {
        templateUrl: 'views/cart/index.html',
        controller: 'CartViewCtrl'
    });
	
    $routeProvider.when('/orders', {
        templateUrl: 'views/orders/index.html',
        controller: 'OrderViewCtrl'
    });
    
    $routeProvider.when('/my_orders', {
        templateUrl: 'views/orders/index_restaurateur.html',
        controller: 'OrderRestaurateurViewCtrl'
    });

	$routeProvider.otherwise({redirectTo: '/home'});

}]);
