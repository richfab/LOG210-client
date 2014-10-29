/*global myApp*/
/*jslint node: true */

'use strict';

myApp.controller('MenuListCtrl', ['$scope', 'Restangular', '$modal',
    function ($scope, Restangular, $modal) {
		 
        $scope.updateList = function () {
            Restangular.all("menus").getList().then(function (data) {
                $scope.menus = data;
            }, function (result) {
                $scope.notifyMessage(result.data, "danger");
            });
        };
        
        $scope.updateList();
		
		// ============================= Functions to manage =============================

		$scope.add = function () {
			$modal.open({
				templateUrl: 'views/menus/add-edit.html',
				controller: 'MenuAddCtrl'
			}).result.then(function (result) {
                if (result) {
                    $scope.updateList();
                    $scope.notifyMessage("Le menu a bien été ajouté", "success");
				}
			});
		};
        
        $scope.edit = function (menu) {
			$modal.open({
				templateUrl: 'views/menus/add-edit.html',
				controller: 'MenuEditCtrl',
				resolve: {
					menu: function () {
						return Restangular.copy(menu);
					}
				}
			}).result.then(function (result) {
				if (result) {
					$scope.updateList();
					$scope.notifyMessage("Le menu a bien été modifié", "success");
				}
			});
		};
        
        $scope.remove = function (menu) {
			$modal.open({
				templateUrl: 'views/menus/delete.html',
				controller: 'MenuDeleteCtrl',
				resolve: {
					menu: function () {
						return menu;
					}
				}
			}).result.then(function (result) {
				if (result) {
					$scope.updateList();
                    $scope.notifyMessage("Le menu a bien été supprimé", "success");
				}
			});
		};
		

    }]);