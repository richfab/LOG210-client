/*global myApp*/
/*jslint node: true */

'use strict';

myApp.controller('RestaurantEditCtrl', ['$scope', '$modalInstance', 'restaurant',
    function ($scope, $modalInstance, restaurant) {

		// Get order
        $scope.order = order;

		// Cancel restaurant editing
        $scope.cancel = function () {
			$modalInstance.close();
        };

    }]);