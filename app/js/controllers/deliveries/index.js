/*global myApp*/
/*jslint node: true */

'use strict';

myApp.controller('DeliveryViewCtrl', ['$rootScope', '$scope', 'Restangular', '$modal',
    function ($rootScope, $scope, Restangular, $modal) {

        $rootScope.currentMenu = 'deliveries';

        $scope.updateList = function () {
            Restangular.all("orders?client_id="+$rootScope.currentUser.id).getList().then(function (data) {
                $scope.orders = data;
            }, function (result) {
                $scope.notifyMessage(result.data, "danger");
            });
        };

        $scope.updateList();
        
        $scope.show_directions = function () {
            
            $scope.order = {from: '6548 rue de Normanville, Montreal CA',
                           to: '3010 avenue Van horne, Montreal CA',
                           id: 1245}
            
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