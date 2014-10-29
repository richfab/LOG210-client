/*global myApp, angular*/
/*jslint node: true */

'use strict';

myApp.controller('MenuEditCtrl', ['$scope', '$q', '$modalInstance', 'Restangular', 'menu',
    function ($scope, $q, $modalInstance, Restangular, menu) {
        
        // Get menu from the list
        $scope.menu = menu;
        
        // Add a dish to the list in the menu
        $scope.addDish = function () {
            $scope.menu.dishes.push({});
        };
        
        // Removes a dish to the list in the menu
        $scope.removeDish = function (dish) {
            var index = $scope.menu.dishes.indexOf(dish);
            if (index > -1) {
                $scope.menu.dishes.splice(index, 1);
            }
        };
        
        var promises = [];
        
        // Save menu
        $scope.save = function () {
            
            // Delete menu
            Restangular.one('menus', $scope.menu.id).remove().then(function (result) {
                
                // Request server to add new menu
                Restangular.all('menus').post($scope.menu).then(function (result) {

                    //Inserts all dishes in menu
                    angular.forEach($scope.menu.dishes, function (dish) {
                        var deferred = $q.defer();

                        dish.menu_id = result.id;
                        dish.price = parseFloat(dish.price);
                        if(!dish.description) dish.description = "";
                        
                        if (dish.description === "") {
                            $scope.notifyMessage("Un plat a été ajouté sans description", "danger");
                        }

                        Restangular.all('dishes').post(dish).then(function (result) {
                            deferred.resolve(result);
                        }, function (result) {
                            $scope.dataAlert = {
                                message: result.data,
                                type: 'danger'
                            };
                            deferred.reject(result);
                        });

                        promises.push(deferred.promise);
                    });

                    $q.all(promises).then(function (result) {
                        $modalInstance.close(result);
                    });

                }, function (result) {
                    $scope.dataAlert = {
                        message: result.data,
                        type: 'danger'
                    };
                });
                
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