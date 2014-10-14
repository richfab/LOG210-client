/*global myApp, angular*/
/*jslint node: true */

'use strict';

// Configuration of HTTP
myApp.config(["$httpProvider", function ($httpProvider) {
    var httpStatusCodeInterceptorFactory = function ($cookieStore, $q, $location, $rootScope) {

        function onSuccess(response) {
            return response;
        }

        function onError(response) {
            if (response.status === 404 && response.data === "") {
                $location.path('/noconnect');
            }
            if (response.status === 401) {
				$rootScope.currentUser = undefined;
				$cookieStore.remove("currentuser");
				$cookieStore.remove("session");

                if ($location.path() !== "/home") {
                    $location.path('/home');
                }

				response.data="Vous n'êtes pas autorisé à accéder à cette page";
            }
            return $q.reject(response);
        }

        return function (promise) {
            return promise.then(onSuccess, onError);
        };
    };

    //Activate your interceptor
    $httpProvider.responseInterceptors.push(httpStatusCodeInterceptorFactory);
}]);
