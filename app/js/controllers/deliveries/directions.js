/*global myApp*/
/*jslint node: true */

'use strict';

myApp.controller('DeliveryDirectionsCtrl', ['$scope', '$modalInstance', 'order', '$http', 'Restangular',
function ($scope, $modalInstance, order, $http, Restangular) {

    // Get order
    $scope.order = order;
    $scope.order.from = order.restaurant.address +  " " + order.restaurant.city + " " + order.restaurant.zipcode;
    $scope.order.to = order.address.address + " " + order.address.city + " " + order.address.zipcode  + " " + order.address.country.name;

    // Cancel restaurant editing
    $scope.cancel = function () {
        $modalInstance.close();
    };

    $scope.accept = function () {
		// Request server to update order state
        $scope.order.state_id = 4;
        Restangular.one('orders', $scope.order.id).put($scope.order).then(function (result) {
            $modalInstance.close(result);
        }, function (result) {
            $scope.dataAlert = {
                message: result.data,
                type: 'danger'
            };
        });
    }

    // Method for ui-select
    $scope.address = {};
    $scope.refreshAddresses = function(address) {
        var params = {
            address: address,
            sensor: false
        };
        return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {
            params: params
        }).then(function(response) {
            $scope.addresses = response.data.results;
        });
    };

}]);