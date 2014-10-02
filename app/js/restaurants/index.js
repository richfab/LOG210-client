'use strict';

angular.module('myApp.restaurants', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/restaurants', {
        templateUrl: 'views/restaurants/index.html',
        controller: 'RestaurantListCtrl'
  });
}])

.controller('RestaurantListCtrl', ['$scope',
    function($scope) {
        $scope.restaurants = [
            {id:1, name:'Submway', phone:'5144239876', address:'rue de Sherbrook', zip:'H2S6H4', city:'Montreal', country:'Canada'},
            {id:1, name:'MacDonalds', phone:'5144444876', address:'rue de Normanville', zip:'B236H4', city:'Quebec', country:'Canada'},
        ];
}]);