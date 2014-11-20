/*global myApp*/
/*jslint node: true */

'use strict';


myApp.controller('DeliveryViewCtrl', ['$rootScope', '$scope', 'Restangular', '$modal',
    function ($rootScope, $scope, Restangular, $modal) {

        $rootScope.currentMenu = 'deliveries';

        $scope.updateList = function () {
            Restangular.all("orders?state=2").getList().then(function (data) {
                $scope.orders = data;
            }, function (result) {
                $scope.notifyMessage(result.data, "danger");
            });
        };

        $scope.updateList();
        
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
            });
        };

	}]);