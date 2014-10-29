/*global myApp*/
/*jslint node: true */

'use strict';

myApp.controller('AlertCtrl', ['$rootScope', '$timeout', function AlertCtrl($rootScope, $timeout) {

    $rootScope.alerts = [];

    $rootScope.closeAlert = function (index) {
        $rootScope.alerts.splice(index, 1);
    };

    $rootScope.notifyMessage = function (msg, type) {
        var alert = { type: type, msg: msg };
        $rootScope.displayNotification(alert);
    };

    $rootScope.displayNotification = function (alert) {
        $rootScope.alerts.push(alert);
        $timeout(function () {
            $rootScope.closeAlert($rootScope.alerts.indexOf(alert));
        }, 4000);
    };

}]);