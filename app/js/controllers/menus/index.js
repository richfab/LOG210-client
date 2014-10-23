/*global myApp*/
/*jslint node: true */

'use strict';

myApp.controller('MenuListCtrl', ['$scope', 'Restangular', '$modal',
    function ($scope, Restangular, $modal) {
		
		$scope.menus = [{
			name: "Menu du jour",
			dishes: [{name: "Sauté de canard", price: 19.99, description: "Canard frais des Vosges"},
					 {name: "Salade verte", price: 9.90, description: "Mélange de salade fraiche"},
					 {name: "Crême brulé", price: 9.90, description: "Crême brulé au chalumeau et nappé de sucre"}]
		}, {
			name: "Menu du pêcheur",
			dishes: [{name: "Salade de saumon", price: 12.99, description: "Pêché la veille"},
					 {name: "Filet de Cabilleau", price: 29.90, description: "Pêché la veille"},
					 {name: "Dame blanche", price: 9.90, description: "Glace à la vanille et chocolat"}]
		}];
		
		// ============================= Functions to manage =============================

		$scope.add = function () {
			$modal.open({
				templateUrl: 'views/menu/add-edit.html',
				controller: 'MenuAddCtrl'
			}).result.then(function (result) {
				
			});
		};
		

    }]);