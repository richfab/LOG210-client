/*jslint node: true */
/*global angular: true*/

'use strict';

angular.module('myApp').directive('gMapDirection', [function () {
    return {
        restrict: 'E',
        template:   '<div id="maps-canvas" style="height: 400px;"></div>',
        scope: {
            from: "=",
            to: "="
        },

        link: function (scope) {

            var directionsDisplay;
            var directionsService = new google.maps.DirectionsService();
            var map = scope.googleMap;

            scope.initialize = function () {
                directionsDisplay = new google.maps.DirectionsRenderer();
                var chicago = new google.maps.LatLng(41.850033, -87.6500523);
                var mapOptions = {
                    zoom:7,
                    center: chicago
                }
                map = new google.maps.Map(document.getElementById("maps-canvas"), mapOptions);
                directionsDisplay.setMap(map);
                scope.calcRoute();
            };

            scope.calcRoute = function () {
                var start = scope.from;
                var end = scope.to;
                var request = {
                    origin:start,
                    destination:end,
                    travelMode: google.maps.TravelMode.DRIVING
                };
                directionsService.route(request, function(result, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        directionsDisplay.setDirections(result);
                    }
                });
            }

            scope.initialize();
        }
    };
}]);