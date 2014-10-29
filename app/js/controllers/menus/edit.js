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

			// Request server to add new restaurant
            Restangular.one('menus', $scope.menu.id).put($scope.menu).then(function (result) {
                
                // Inserts all dishes in menu
                angular.forEach($scope.menu.dishes, function (dish) {
                    var deferred = $q.defer();

                    dish.menu_id = $scope.menu.id;
					dish.price = parseFloat(dish.price);
                    
                    // Updates dish
                    if (dish.id) {
                        // TODO
                    } else {
                        // Inserts dish
                        // TODO
                    }

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
        };
        
        // Cancel restaurant adding
        $scope.cancel = function () {
            $modalInstance.close();
        };
        
    }]);