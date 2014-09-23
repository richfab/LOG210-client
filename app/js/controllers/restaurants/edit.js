/*global myApp*/
/*jslint node: true */

'use strict';

myApp.controller('RestaurantEditCtrl', ['$scope', '$modalInstance', 'Restangular', 'restaurant',
    function ($scope, $modalInstance, Restangular, restaurant) {
        
        $scope.restaurant = restaurant;
        
        // Get restaurateurs
        Restangular.all('restaurateurs').getList().then(function (result) {
            $scope.restaurateurs = result;
        }, function (result) {
            // Add a data alert to show error message
            //$scope.dataAlert = result;
        });
        
        $scope.save = function () {
            
            //            test whether restaurateur id is integer
            if(!Number.isInteger($scope.restaurant.restaurateur_id)){
                delete $scope.restaurant.restaurateur_id;
            }
            
            console.log($scope.restaurant);
            
            Restangular.one('restaurants', $scope.restaurant.id).put($scope.restaurant).then(function (result) {
                $modalInstance.close(result);
            }, function (result) {
                // Add a data alert to show error message
                //$scope.dataAlert = result;
            });
        };
        
        $scope.cancel = function () {
            $modalInstance.close();
        };
        
    }]);