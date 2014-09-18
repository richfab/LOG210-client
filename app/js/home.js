/*global myApp*/
/*jslint node: true */

'use strict';

myApp.controller('HomeViewCtrl', ['$rootScope', '$scope',
    function ($rootScope, $scope) {
		$rootScope.currentMenu = 'home';
	}]);