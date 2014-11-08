/*global myApp*/
/*jslint node: true */

'use strict';

myApp.controller('OrderRestaurateurViewCtrl', ['$rootScope', '$scope', 'Restangular',
    function ($rootScope, $scope, Restangular) {
		
        $rootScope.currentMenu = 'my_orders';
        
        $scope.updateListWaiting = function () {
            Restangular.all("orders?state=0&restaurateur_id="+$rootScope.currentUser.restaurant_id).getList().then(function (data) {
                $scope.orders_waiting = data;
            }, function (result) {
                $scope.notifyMessage(result.data, "danger");
            });
        };
        
        $scope.updateListPreparation = function () {
            Restangular.all("orders?state=1&restaurateur_id="+$rootScope.currentUser.restaurant_id).getList().then(function (data) {
                $scope.orders_preparation = data;
            }, function (result) {
                $scope.notifyMessage(result.data, "danger");
            });
        };
        
        $scope.updateListReady = function () {
            Restangular.all("orders?state=2&restaurateur_id="+$rootScope.currentUser.restaurant_id).getList().then(function (data) {
                $scope.orders_ready = data;
            }, function (result) {
                $scope.notifyMessage(result.data, "danger");
            });
        };
        
        $scope.changeState = function(orderId, stateId) {
            Restangular.one("orders", orderId).put({state_id: stateId}).then(function (result) {
                $scope.notifyMessage("Le changement de statut a bien été pris en compte.", "success");
                $scope.updateList();
            }, function (result) {
                $scope.notifyMessage(result.data, "danger");
            });
        };
        
        $scope.updateList = function() {
            $scope.updateListWaiting();
            $scope.updateListPreparation();
            $scope.updateListReady();
        }
        
        $scope.updateList();
        
	}]);