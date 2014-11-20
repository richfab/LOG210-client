/*global myApp*/
/*jslint node: true */

'use strict';

myApp.controller('DeliveryViewCtrl', ['$rootScope', '$scope', 'Restangular', '$modal', 'uiGmapGoogleMapApi',
    function ($rootScope, $scope, Restangular, $modal, uiGmapGoogleMapApi) {

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
        $scope.googleMap = {}; // this is filled when google map is initiated
        
        // The "then" callback function provides the google.maps object.
        uiGmapGoogleMapApi.then(function(maps) {
            console.log('is reday');
            $scope.googleAPIisReady = true;
        });
        
        $scope.show_directions = function (googleMap) {
            
            var order = {from: '6548 rue de Normanville, Montreal CA',
                           to: '3010 avenue Van horne, Montreal CA',
                           id: 1245}
            
            $modal.open({
                templateUrl: 'views/deliveries/directions.html',
                controller: 'DeliveryDirectionsCtrl',
                resolve: {
                order: function () {
                        return Restangular.copy(order);
                    },
                    googleMap: googleMap
                }
            });
        };

	}]);