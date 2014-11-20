/*global myApp*/
/*jslint node: true */

'use strict';

myApp.controller('DeliveryViewCtrl', ['$rootScope', '$scope', 'Restangular',
    function ($rootScope, $scope, Restangular) {

        $rootScope.currentMenu = 'deliveries';

        $scope.updateList = function () {
            Restangular.all("orders?client_id="+$rootScope.currentUser.id).getList().then(function (data) {
                $scope.orders = data;
            }, function (result) {
                $scope.notifyMessage(result.data, "danger");
            });
        };

        $scope.updateList();

	}]);