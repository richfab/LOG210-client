'use strict';

angular.module('myApp.restaurants', ['ngRoute'])

        .config(['$routeProvider', function($routeProvider) {
                $routeProvider.when('/restaurants', {
                    templateUrl: 'views/restaurants/index.html',
            controller: 'RestaurantListCtrl'
        });
    }])

        .controller('RestaurantListCtrl', [function() {
                
            }]);