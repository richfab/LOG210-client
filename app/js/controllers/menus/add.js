/*global myApp*/
/*jslint node: true */

'use strict';

myApp.controller('MenuAddCtrl', ['$scope', '$modalInstance', 'Restangular',
    function ($scope, $modalInstance, Restangular) {
        
        $scope.dishes = [{}];
        $scope.menu = {};
        
        $scope.addDish = function () {
            $scope.dishes.push({});
        };
        
        // Save menu
        $scope.save = function () {
            
            console.log($scope.dishes);
            console.log($scope.menu);

			// Request server to add new restaurant
            Restangular.all('menus').post($scope.menu).then(function (result) {
                
                //Insert each dish
                for(var dish in $scope.dishes){
                    Restangular.all('dishes').post(dish).then(function (result) {}, function (result) {
                        $scope.dataAlert = {
                            message: result.data,
                            type: 'danger'
                        };
                        return;
                    });
                }
                $modalInstance.close(result);
            }, function (result) {
                $scope.dataAlert = {
                    message: result.data,
                    type: 'danger'
                };
            });
        };
        
        // Cancel restaurant adding
        $scope.cancel = function () {
            $modalInstance.close();
        };
        
    }]);