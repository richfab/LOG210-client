/*global myApp, angular*/
/*jslint node: true */

'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
	'ngRoute',
	'restangular',
	'ui.bootstrap',
	'ngCookies',
	'gettext'
]);

// Run when application is launched
myApp.run(['$rootScope', '$modal', '$cookieStore', "$location", "gettextCatalog", 'Restangular',
	function ($rootScope, $modal, $cookieStore, $location, gettextCatalog, Restangular) {

		// Set current menu
		$rootScope.currentMenu = 'home';

		// Check if a user is connected from the cookies
		$rootScope.currentUser = $cookieStore.get("currentuser");

		// Set language
		gettextCatalog.setCurrentLanguage('en');

		$rootScope.currentLanguage = 'en';
		// Change language
		$rootScope.changeLanguage = function() {
			$rootScope.currentLanguage = ($rootScope.currentLanguage == 'en' ? 'fr' : 'en');
			gettextCatalog.setCurrentLanguage($rootScope.currentLanguage);
		}

		// Signup modal
		$rootScope.signup = function () {
			$modal.open({
				templateUrl: 'views/signup.html',
				controller: 'SignupCtrl'
			});
		};

		// Login
        // Fix input element click problem
        $('#signInDropdown input, #signInDropdown label, #signInDropdown button').click(function(e) {
            e.stopPropagation();
        });
        
		$rootScope.login = function () {
	        Restangular.all('accesstokens').post($rootScope.user).then(function (result) {
				$rootScope.currentUser = result;
				$cookieStore.put("currentuser", $rootScope.currentUser);
                $rootScope.dataAlert = {};
	        }, function (result) {
                $rootScope.dataAlert = {
                    message: result.data,
                    type: 'danger'
                };
	        });
		};
        
		// Logout
		$rootScope.logout = function () {
			$rootScope.notifyMessage("Deconnexion effectuée", "info");
			$rootScope.currentUser = null;
			$cookieStore.remove("currentuser");
			$location.path("/");
		};

		// Redirection
        $rootScope.$on("$routeChangeStart", function (event, current, next) {
			if ($location.path().match("/admin/")) { // or with current.$$route.originalPath
				if ($rootScope.currentUser == null || $rootScope.currentUser.type != "entrepreneur") {
					$location.path("/");
				}
			}
        });

	}]);
