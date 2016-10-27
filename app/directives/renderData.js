(function () {
    'use strict';

    angular.module('pmajs.directives.renderData', ['pmajs'])
           .directive('renderData', ['$rootScope', '$timeout', function ($rootScope, $timeout) {
               return {
                   scope: {
                       renderTemplate: "@",
                       data: "=renderInput",
                       renderOutput: "="
                   },
                   templateUrl: function(element, attrs) {
                       return attrs.renderTemplate;
                   },
                   link: function (scope, element) {
                       scope.appName = $rootScope.appName;
                       scope.$watch('data', function (newRenderInput, oldRenderInput) {
                           if (!oldRenderInput && oldRenderInput == newRenderInput) {
                               return;
                           }
                           $timeout(function () {
                               scope.renderOutput = element.text();
                           }, 0);
                       });
                   }
               }
           }]);
})();
