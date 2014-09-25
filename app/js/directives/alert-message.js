/*jslint node: true */
/*global angular: true*/

'use strict';

angular.module('myApp').directive('alertMessage', [function () {
    return {
        restrict: 'E',
        template:   '<div ng-show="alertData.message.length > 0">' +
                        '<div class="alert alert-{{alertData.type}} alert-dismissable">' +
                            '<button type="button" class="close" ng-click="closeAlert()">&times;</button>' +
                            '<div>{{alertData.message}}</div>' +
                        '</div>' +
                    '</div>',
        scope: {
            alertData: "="
        },

        link: function (scope) {
            scope.closeAlert = function () {
                scope.alertData.message = "";
            };
        }
    };
}]);
