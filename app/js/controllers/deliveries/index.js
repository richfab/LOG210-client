/*global myApp*/
/*jslint node: true */

'use strict';


myApp.controller('DeliveryViewCtrl', ['$rootScope', '$scope', 'Restangular', '$modal',
    function ($rootScope, $scope, Restangular, $modal) {

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

        $scope.updateListReady();
        $scope.updateListInDelivery();
        $scope.updateListDelivered();

        $scope.op = function () {
            $modal.open();
        }

        $scope.show_directions = function (order) {

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