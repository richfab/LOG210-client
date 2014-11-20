/*global myApp*/
/*jslint node: true */

'use strict';

myApp.controller('DeliveryDirectionsCtrl', ['$scope', '$modalInstance', 'order',
    function ($scope, $modalInstance, order) {

		// Get order
        $scope.order = order;
        $scope.order.from = order.restaurant.address +  " " + order.restaurant.city + " " + order.restaurant.zipcode;
        $scope.order.to = order.address.address + " " + order.address.city + " " + order.address.zipcode  + " " + order.address.country.name;

		// Cancel restaurant editing
        $scope.cancel = function () {
			$modalInstance.close();
        };

    }]);