/*global myApp*/
/*jslint node: true */

'use strict';

myApp.controller('DeliveryDirectionsCtrl', ['$scope', '$modalInstance', 'order', 'googleMap',
    function ($scope, $modalInstance, order, googleMap) {

		// Get order
        $scope.order = order;
        $scope.googleMap = googleMap;
        
        $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
        
        var directionsDisplay;
        var directionsService = new google.maps.DirectionsService();
        var map = $scope.googleMap;

        $scope.initialize = function () {
            directionsDisplay = new google.maps.DirectionsRenderer();
            directionsDisplay.setMap(map);
            $scope.calcRoute();
        };

        $scope.calcRoute = function () {
            var start = $scope.order.from;
            var end = $scope.order.to;
            var request = {
                origin:start,
                destination:end,
                travelMode: google.maps.TravelMode.DRIVING
            };
            directionsService.route(request, function(result, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(result);
                    console.log('jusqiui');
                }
            });
        }
        
        $scope.initialize();

		// Cancel restaurant editing
        $scope.cancel = function () {
			$modalInstance.close();
        };

    }]);