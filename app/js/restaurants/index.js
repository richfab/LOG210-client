'use strict';

angular.module('myApp.restaurants', ['ngRoute'])

.config(['$routeProvider', function($routeProvider, RestangularProvider) {
    $routeProvider.when('/restaurants', {
        templateUrl: 'views/restaurants/index.html',
        controller: 'RestaurantListCtrl'
  });
}])

.controller('RestaurantListCtrl', ['$scope','$rootScope','Restangular',
    function($scope, $rootScope, Restangular) {
        
        $rootScope.currentMenu = 'restaurants';
        
        Restangular.all("restaurants").getList().then(function(data){
            $scope.restaurants = data;
        }, function(){
            console.log('erreur');
        });
        
        Restangular.one("restaurants",1).get().then(function(data){
            $scope.restaurant = data;
        }, function(){
            console.log('erreur');
        });
        
//        $scope.restaurants = [
//            { "id": 1, "name": "Subway", "phone": "5144239876", "address": "rue de Sherbrook", "zip": "H2S6H4", "city": "Montreal", "country": "Canada" },
//            { "id": 1, "name": "MacDonalds", "phone": "5144444876", "address": "rue de Normanville", "zip": "B236H4", "city": "Quebec", "country": "Canada" }
//        ];
}]);