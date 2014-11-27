/*global myApp*/
/*jslint node: true */

'use strict';

myApp.controller('DeliveryDirectionsCtrl', ['$scope', '$modalInstance', 'order', 'Restangular',
function ($scope, $modalInstance, order, Restangular) {

    // Get order
    $scope.order = order;
    $scope.order.from = order.from;
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

}]);