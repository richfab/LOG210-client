'use strict';

angular.module('myApp.restaurants', ['ngRoute'])

        .config(['$routeProvider', function($routeProvider, RestangularProvider) {
                $routeProvider.when('/restaurants', {
                    templateUrl: 'views/restaurants/index.html',
            controller: 'RestaurantListCtrl'
        });
    }])

        .controller('RestaurantListCtrl', ['$scope','$rootScope','Restangular','$modal',
    function($scope, $rootScope, Restangular, $modal) {
        
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
        
        $scope.addRestaurant = function(){
            var modalInstance = $modal.open({
                templateUrl: 'views/restaurants/add.html',
                controller: 'RestaurantAddCtrl',
            });
            
            modalInstance.result.then(function () {
                
            }, function () {
                
            });
        };
    }]);