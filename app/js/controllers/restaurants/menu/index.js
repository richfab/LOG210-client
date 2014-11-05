/*global myApp*/
/*jslint node: true */

'use strict';

myApp.controller('MenuRestaurantListCtrl', ['$scope', '$routeParams', '$rootScope', 'Restangular', '$modal', '$cookieStore',
	function ($scope, $routeParams, $rootScope, Restangular, $modal, $cookieStore) {

		// Set current menu
		$rootScope.currentMenu = 'restaurants';
		
		// Init quantities
		$scope.quantity = 0;
		
		// Get restaurant name
		Restangular.one("restaurants", $routeParams.restaurantId).get().then(function (data) {
			$scope.restaurant = data;
		}, function (result) {
			$scope.notifyMessage(result.data, "danger");
		});
		
		// Update list
		$scope.updateList = function () {
			Restangular.one("restaurants", $routeParams.restaurantId).all('menus').getList().then(function (data) {
				$scope.menus = data;
			}, function (result) {
				$scope.notifyMessage(result.data, "danger");
			});
		};
		
		// Add to cart
		$scope.addCart = function(dish, quantity) {
			if ($rootScope.cart['restaurant_id'] == $routeParams.restaurantId || $rootScope.cart['restaurant_id'] == null) {
				if(quantity > 0) {
					$rootScope.cart.lines_order.push({dish_id: dish.id, quantity: quantity});
					$scope.notifyMessage(dish.name + " a bien été ajouter au panier (Quantité: " + quantity + ")", "success");
					$cookieStore.put("cart", $rootScope.cart);
				}			
			} else {
				$scope.notifyMessage("Vous ne pouvez pas commander depuis plusieurs restaurants. Veuillez d'abord vider votre panier.", "danger");
			}
		}

		$scope.updateList();
		

	}]);