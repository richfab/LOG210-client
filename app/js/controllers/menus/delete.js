/*global myApp, angular*/
/*jslint node: true */

'use strict';

myApp.controller('MenuDeleteCtrl', ['$scope', '$q', '$modalInstance', 'Restangular', 'menu',
	function ($scope, $q, $modalInstance, Restangular, menu) {

		$scope.menu = menu;
        var promises = [];
        
        $scope.remove = function () {
            
            //first delete all dishes in menu
            angular.forEach($scope.menu.dishes, function (dish) {
                var deferred = $q.defer();

                Restangular.one('dishes', dish.id).remove().then(function (result) {
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
                
                //then delete menu
                Restangular.one('menus', $scope.menu.id).remove().then(function (result) {
                    $modalInstance.close(result);
                }, function (result) {
                    $scope.dataAlert = {
                        message: result.data,
                        type: 'danger'
                    };
                });
            });

        };

		$scope.cancel = function () {
			$modalInstance.close();
		};

	}]);