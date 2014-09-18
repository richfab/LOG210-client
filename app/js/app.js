'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'restangular',
    'ui.bootstrap',
    'myApp.restaurants'
]).
        config(function($routeProvider, RestangularProvider) {
            $routeProvider.otherwise({redirectTo: '/'});
    
    RestangularProvider.setBaseUrl('http://localhost:5000');
})
        .run(['$rootScope',
    function($rootScope) {
        $rootScope.currentMenu = 'home';
    }]);