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
		$scope.updateList();
		
		// Add to cart
		$scope.addCart = function(dish, quantity) {

			// Check if there are already a cart with dish from other restaurant
			if ($rootScope.cart['restaurant_id'] == $routeParams.restaurantId || $rootScope.cart['restaurant_id'] == null) {
				
				// Check if dish_id already exist in the cart and update quantity if exist
				var dishFinded = false;
				$rootScope.cart.lines_order.forEach(function (lo) {
					if(dish.id == lo.dish_id) {
						lo.quantity += quantity;
						dishFinded = true;
					}
				})
				// Else add new dish_id with quantity
				if(!dishFinded)
					$rootScope.cart.lines_order.push({dish_id: dish.id, quantity: quantity});
				
				// Update cookie
				$cookieStore.put("cart", $rootScope.cart);
				
				$scope.notifyMessage(dish.name + " a bien été ajouter au panier (Quantité: " + quantity + ")", "success");		
			} else {
				$scope.notifyMessage("Vous ne pouvez pas commander depuis plusieurs restaurants. Veuillez d'abord vider votre panier.", "danger");
			}
		}

	}]);