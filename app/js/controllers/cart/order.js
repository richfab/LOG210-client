/*global myApp*/
/*jslint node: true */

'use strict';

myApp.controller('OrderValidateCtrl', ['$rootScope', '$scope', '$modalInstance', 'Restangular',
    function ($rootScope, $scope, $modalInstance, Restangular) {

		// Order
		$scope.order = {dishes: []};
		
		// Get addresse for client
		Restangular.all('addresses?personne_id=' + $rootScope.currentUser.id).getList().then(function (result) {
			$scope.addresses = result;
		});
		
		// Save restaurant
        $scope.save = function () {

			$rootScope.cart.lines_order.forEach(function (lineOrder) {
				$scope.order.dishes.push({dish_id: lineOrder.dish_id, quantity: lineOrder.quantity});
			})

			// Request server to add new restaurant
            Restangular.all('orders').post($scope.order).then(function (result) {
                $modalInstance.close("ok");
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
		
		// Datepicker functions
		$scope.clear = function () {
			$scope.dt = null;
		};
		$scope.open = function($event) {
			$event.preventDefault();
			$event.stopPropagation();

			$scope.opened = true;
		};

    }]);