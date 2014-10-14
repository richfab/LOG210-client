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
myApp.run(['$rootScope', '$modal', '$http', '$cookieStore', "$location", "gettextCatalog", "Restangular",
	function ($rootScope, $modal, $http, $cookieStore, $location, gettextCatalog, Restangular) {

		// Set current menu
		$rootScope.currentMenu = 'home';

		// Check if a user is connected from the cookies
		$rootScope.currentUser = $cookieStore.get("currentuser");

		// Set language
		if ($rootScope.currentUser == undefined) {
			gettextCatalog.setCurrentLanguage('fr');
		}

		// Change language
		$rootScope.changeLanguage = function() {
			$rootScope.currentLanguage = ($rootScope.currentLanguage == 'en' ? 'fr' : 'en');
			gettextCatalog.setCurrentLanguage($rootScope.currentLanguage);

			var user = {language: $rootScope.currentLanguage};

			Restangular.one($rootScope.currentUser.type + 's', $rootScope.currentUser.id).put(user).then(function (result) {
				$rootScope.currentUser = result;
				$cookieStore.put("currentuser", $rootScope.currentUser);
			}, function (result) {
				$scope.dataAlert = {
					message: result.data,
					type: 'danger'
				};
			});
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
				// Set language
				gettextCatalog.setCurrentLanguage($rootScope.currentUser.language);
				$rootScope.notifyMessage("Connexion effectuée.", "info");
	        }, function (result) {
                $rootScope.notifyMessage(result.data, "danger");
	        });
		};

		// Logout
		$rootScope.logout = function () {
	        Restangular.all('accesstokens').remove().then(function (result) {
				$rootScope.notifyMessage("Deconnexion effectuée", "info");
				$rootScope.currentUser = null;
				$cookieStore.remove("currentuser");
				$cookieStore.remove("session");
				$location.path("/");
	        }, function (result) {
				$rootScope.notifyMessage("Un problème est survenu lors de la déconnexion", "danger");
	        });
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
