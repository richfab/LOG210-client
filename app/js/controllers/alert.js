/*global myApp*/
/*jslint node: true */

'use strict';

myApp.controller('AlertCtrl', ['$rootScope', '$timeout', function AlertCtrl($rootScope, $timeout) {

    $rootScope.alerts = [];

    $rootScope.closeAlert = function (index) {
        $rootScope.alerts.splice(index, 1);
    };

    $rootScope.notifySuccess = function () {
        var alert = { type: 'notif', msg: 'Modifications enregistrées' };
        $rootScope.displayNotification(alert);
    };
    
    $rootScope.notifyError = function () {
        var alert = { type: 'notif', msg: "Une erreur s'est produite" };
        $rootScope.displayNotification(alert);
    };
    
    $rootScope.displayNotification = function (alert) {
        $rootScope.alerts.push(alert);
        $timeout(function () {
            $rootScope.closeAlert($rootScope.alerts.indexOf(alert));
        }, 2000);
    };

    $rootScope.addAlert = function (alert) {
        $rootScope.alerts.push(alert);
    };

}]);