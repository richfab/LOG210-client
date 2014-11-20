/*global myApp*/
/*jslint node: true */

'use strict';


myApp.controller('DeliveryViewCtrl', ['$rootScope', '$scope', 'Restangular', '$modal',
    function ($rootScope, $scope, Restangular, $modal) {

        $rootScope.currentMenu = 'deliveries';
        $scope.googleAPIisReady = false;

        $scope.updateList = function () {
            Restangular.all("orders?state=2").getList().then(function (data) {
                $scope.orders = data;
            }, function (result) {
                $scope.notifyMessage(result.data, "danger");
            });
        };

        $scope.updateList();

	}]);