/*global myApp, angular*/
/*jslint node: true */

'use strict';

myApp.controller('MenuAddCtrl', ['$rootScope', '$scope', '$q', '$modalInstance', 'Restangular',
    function ($rootScope, $scope, $q, $modalInstance, Restangular) {
        
        $scope.menu = {dishes : [{}]};
        
        $scope.addDish = function () {
            $scope.menu.dishes.push({});
        };
        
        $scope.removeDish = function (dish) {
            
            // Cannot have 0 dish
            if($scope.menu.dishes.length <= 1){
                $scope.dataAlert = {
                    message: "Le menu doit comporter au moins un plat",
                    type: 'danger'
                };
                return;
            }
            
            var index = $scope.menu.dishes.indexOf(dish);
            if (index > -1) {
                $scope.menu.dishes.splice(index, 1);
            }
        };
        
        var promises = [];
        
        // Save menu
        $scope.save = function () {

			// Affect restaurant_id to the menu
			$scope.menu.restaurant_id = $rootScope.currentUser.restaurant_id;
			
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
        };
        
        // Cancel menu adding
        $scope.cancel = function () {
            $modalInstance.close();
        };
        
    }]);