(function () {
    'use strict';

    angular.module('pmajs.pages.services', [
      'pmajs'
    ]).controller('ServicesController', ['$scope', '$state', '$timeout', 'appDataService', 'appService',
      function ($scope, $state, $timeout, appDataService, appService) {
          var ctrl = this;
          ctrl.status = {};
          ctrl.data = {};
          ctrl.actions = {};

          ctrl.actions.diffModels = diffModels;
          ctrl.actions.diffData = diffData;

          setApiDocsData();

          // implementations
          function setApiDocsData() {
              ctrl.data.apiDocs = appService.getApiDocs();
              if (!ctrl.data.apiDocs) {
                  console.log('Accessing services failed - no API Docs was set');
                  $state.go('intro');
                  return;
              }

              ctrl.data.apiDocsModelsData = appService.getApiDocsModelsData();
              ctrl.data.localApiDocsModelsData = appService.getLocalApiDocsModelsData();
          }

          function diffModels() {
              $state.go('models');
          }

          function diffData() {
              $state.go('processor');
          }

      }
    ]);
})();
