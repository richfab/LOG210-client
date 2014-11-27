/*global myApp, angular*/
/*jslint node: true */

'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
	'ngRoute',
	'restangular',
	'ui.bootstrap',
	'ngCookies',
	'gettext',
    'ui.select',
    'ngSanitize'
]);

// Run when application is launched
myApp.run(['$rootScope', '$modal', '$http', '$cookieStore', "$location", "gettextCatalog", "Restangular",
	function ($rootScope, $modal, $http, $cookieStore, $location, gettextCatalog, Restangular) {

		// Set current menu
		$rootScope.currentMenu = 'home';

		// Check if a user is connected from the cookies
		$rootScope.currentUser = $cookieStore.get("currentuser");

		// Init cart
		$rootScope.initCart = function() {
			$rootScope.cart = $cookieStore.get("cart");
			if($rootScope.cart == undefined) {
				$rootScope.cart = {	restaurant_id: null,
									lines_order: [] };
			}
		}

		$rootScope.resetCart = function() {
            $cookieStore.remove("cart");
			$rootScope.cart = {	restaurant_id: null,
								lines_order: [] };
		}

		$rootScope.initCart();

		/**
		 * {restaurant_id: id, lines_order: [{dish_id: id, quantity: val}, ...]}
		 *
		 */
		// Set language
        if($rootScope.currentUser) {
            $rootScope.currentLanguage = $rootScope.currentUser.language;
        } else {
            //if user is not connected
            $rootScope.currentLanguage = ($cookieStore.get('language') == undefined ? 'fr' : $cookieStore.get('language'));
        }
        gettextCatalog.setCurrentLanguage($rootScope.currentLanguage);

		// Change language
		$rootScope.changeLanguage = function(language) {

            if($rootScope.currentLanguage == language) return;
			$rootScope.currentLanguage = $rootScope.currentLanguage = language;
			gettextCatalog.setCurrentLanguage($rootScope.currentLanguage);

			if($rootScope.currentUser) {
				$rootScope.currentUser.language = $rootScope.currentLanguage;
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
			} else {
                $cookieStore.put("language", language);
            }

		};

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
		$rootScope.login = function (user) {
			if(user) {
				$rootScope.user = user;
			}
	        Restangular.all('accesstokens').post($rootScope.user).then(function (result) {

				// Get current user and set cookie
				$rootScope.currentUser = result;
				$cookieStore.put("currentuser", $rootScope.currentUser);

				// Set language
				$rootScope.currentLanguage = $rootScope.currentUser.language;
				gettextCatalog.setCurrentLanguage($rootScope.currentLanguage);

				$rootScope.notifyMessage("Connexion effectuée.", "info");
				$rootScope.initCart();
	        }, function (result) {
                $rootScope.notifyMessage(result.data, "danger");
	        });
		};

		// Logout
		$rootScope.logout = function () {
	        Restangular.all('accesstokens').remove().then(function (result) {
				$rootScope.notifyMessage("Deconnexion effectuée", "info");
				$rootScope.currentUser = undefined;
				$cookieStore.remove("currentuser");
				$cookieStore.remove("session");
				$cookieStore.remove("cart");
				delete $rootScope.cart;
                delete $rootScope.user;
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
