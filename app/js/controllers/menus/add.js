/*global myApp, angular*/
/*jslint node: true */

'use strict';

myApp.controller('MenuAddCtrl', ['$scope', '$q', '$modalInstance', 'Restangular',
    function ($scope, $q, $modalInstance, Restangular) {
        
        $scope.menu = {dishes : []};
        
        $scope.addDish = function () {
            $scope.menu.dishes.push({});
        };
        
        $scope.removeDish = function (dish) {
            var index = $scope.menu.dishes.indexOf(dish);
            if (index > -1) {
                $scope.menu.dishes.splice(index, 1);
            }
        };
        
        var promises = [];
        
        // Save menu
        $scope.save = function () {

			// Request server to add new menu
            Restangular.all('menus').post($scope.menu).then(function (result) {
                
                //Inserts all dishes in menu
                angular.forEach($scope.menu.dishes, function (dish) {
                    var deferred = $q.defer();

                    dish.menu_id = result.id;
					dish.price = parseFloat(dish.price);
                    
                    if (!dish.description || dish.description === "") {
                        console.log('pas de desc');
                        $scope.dataAlert = {
                            message: "Un plat a été ajouté sans description",
                            type: 'danger'
                        };
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
        };
        
        // Cancel restaurant adding
        $scope.cancel = function () {
            $modalInstance.close();
        };
        
    }]);