/*global myApp, angular*/
/*jslint node: true */

'use strict';

myApp.controller('MenuDeleteCtrl', ['$scope', '$q', '$modalInstance', 'Restangular', 'menu',
	function ($scope, $q, $modalInstance, Restangular, menu) {

		$scope.menu = menu;
        
        $scope.remove = function () {
                
            // Delete menu
            Restangular.one('menus', $scope.menu.id).remove().then(function (result) {
                $modalInstance.close(result);
            }, function (result) {
                $scope.dataAlert = {
                    message: result.data,
                    type: 'danger'
                };
            });

        };

		$scope.cancel = function () {
			$modalInstance.close();
		};

	}]);