/*global myApp*/
/*jslint node: true */

'use strict';

myApp.controller('CartViewCtrl', ['$rootScope', '$scope', 'Restangular', '$cookieStore', '$modal',
    function ($rootScope, $scope, Restangular, $cookieStore, $modal) {
		$rootScope.currentMenu = 'cart';

		$scope.total = 0;
		$rootScope.cart.lines_order.forEach(function (lo) {
			Restangular.one("dishes", lo.dish_id).get().then(function (result) {
				lo.dish = result;
				$scope.total += lo.dish.price;
			});
		});
		
		$scope.empty = function() {
			$rootScope.cart = {	restaurant_id: null,
								lines_order: [] };
			$cookieStore.remove('cart');
		}
		
		$scope.remove = function(index) {
			$rootScope.cart.lines_order.splice(index, 1);
			$cookieStore.put('cart', $rootScope.cart);
		}
		
		$scope.order = function() {
			$modal.open({
				templateUrl: 'views/cart/order.html',
				controller: 'OrderValidateCtrl'
			}).result.then(function (result) {
				$location.path("/orders");
			});
		}
		
	}]);