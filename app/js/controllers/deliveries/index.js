/*global myApp*/
/*jslint node: true */

'use strict';


myApp.controller('DeliveryViewCtrl', ['$rootScope', '$scope', 'Restangular', '$modal', '$http',
    function ($rootScope, $scope, Restangular, $modal, $http) {

        $rootScope.currentMenu = 'deliveries';

        $scope.updateListReady = function () {
            Restangular.all("orders?state=2").getList().then(function (data) {
                $scope.ordersReady = data;
            }, function (result) {
                $scope.notifyMessage(result.data, "danger");
            });
        };

        $scope.updateListInDelivery = function () {
            Restangular.all("orders?state=3").getList().then(function (data) {
                $scope.ordersInDelivery = data;
            }, function (result) {
                $scope.notifyMessage(result.data, "danger");
            });
        };

        $scope.updateListDelivered = function () {
            Restangular.all("orders?state=4").getList().then(function (data) {
                $scope.ordersDelivered = data;
            }, function (result) {
                $scope.notifyMessage(result.data, "danger");
            });
        };
        
        // Method for ui-select
        $scope.address = {};
        $scope.refreshAddresses = function(address) {
            var params = {
                address: address,
                region: "ca"
            };
            return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {
                params: params
            }).then(function(response) {
                $scope.addresses = response.data.results;
            });
        };
        $scope.prout = false;
        $scope.updateListReady();
        $scope.updateListInDelivery();
        $scope.updateListDelivered();

        $scope.op = function () {
            $modal.open();
        }

        $scope.show_directions = function (order) {
            
            order.from = $scope.address.selected.formatted_address;

            $modal.open({
                templateUrl: 'views/deliveries/directions.html',
                controller: 'DeliveryDirectionsCtrl',
                resolve: {
                    order: function () {
                        return Restangular.copy(order);
                    }
                }
            }).result.then(function (result) {
                $scope.updateListReady();
                $scope.updateListInDelivery();
                $scope.updateListDelivered();
            });
        };

        $scope.deliveryOrder = function (order) {
    		// Request server to update order state
            order.state_id = 5;
            Restangular.one('orders', order.id).put(order).then(function (result) {
                $scope.updateListReady();
                $scope.updateListInDelivery();
                $scope.updateListDelivered();
            }, function (result) {
                $scope.dataAlert = {
                    message: result.data,
                    type: 'danger'
                };
            });
        }

	}]);