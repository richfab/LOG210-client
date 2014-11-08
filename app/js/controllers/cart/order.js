/*global myApp*/
/*jslint node: true */

'use strict';

myApp.controller('OrderValidateCtrl', ['$rootScope', '$scope', '$modalInstance', 'Restangular',
    function ($rootScope, $scope, $modalInstance, Restangular) {

		// Order
		$scope.order = {dishes: []};

		// Get address for client
		Restangular.all('addresses?personne_id=' + $rootScope.currentUser.id).getList().then(function (result) {
			$scope.addresses = result;
		});
        
        // ###### Address section ######
        $scope.formAddress = false;
        
        $scope.showFormAddress = function() {
            $scope.formAddress = true;
        };
        
        $scope.hideFormAddress = function() {
            $scope.formAddress = false;
        };
        
        // Get countries
        Restangular.all('countries').getList().then(function (result) {
            $scope.countries = result;
        }, function (result) {
            $scope.dataAlert = {
                message: result.data,
                type: 'danger'
            };
        });
		
        $scope.newAddress = {};
        $scope.saveAddress = function() {
            $scope.newAddress.personne_id = $rootScope.currentUser.id;
            Restangular.all('addresses').post($scope.newAddress).then(function (result) {
                $scope.addresses.push(result);
                $scope.orderAddress = result.id;
                $scope.formAddress = false;
            }, function (result) {
                $scope.dataAlert = {
                    message: result.data,
                    type: 'danger'
                };
            });
        }
        // ##############################
        
        
		// Save order
        $scope.save = function () {
            $scope.order.restaurant_id = $rootScope.cart.restaurant_id;
            $scope.order.date.setHours($scope.order.date.hours);
            $scope.order.date.setMinutes($scope.order.date.minutes);

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