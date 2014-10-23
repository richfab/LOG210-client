/*global myApp*/
/*jslint node: true */

'use strict';

myApp.controller('MenuAddCtrl', ['$scope', '$modalInstance', 'Restangular',
    function ($scope, $modalInstance, Restangular) {
        $scope.dishes = [{}];
        
        $scope.addDish = function () {
            $scope.dishes.push({});
        };
        
        $scope.save = function () {
            console.log($scope.dishes);
        };
    }]);