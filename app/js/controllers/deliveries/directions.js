/*global myApp*/
/*jslint node: true */

'use strict';

myApp.controller('DeliveryDirectionsCtrl', ['$scope', '$modalInstance', 'order',
    function ($scope, $modalInstance, order) {

		// Get order
        $scope.order = order;

		// Cancel restaurant editing
        $scope.cancel = function () {
			$modalInstance.close();
        };

    }]);