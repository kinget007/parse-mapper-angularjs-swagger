(function () {
    'use strict';

    angular.module('pmajs.pages.models', [
      'pmajs'
    ]).controller('ModelsController', ['$scope', '$state', '$timeout', 'appDataService', 'appService',
      function ($scope, $state, $timeout, appDataService, appService) {
          var ctrl = this;
          ctrl.status = {};
          ctrl.data = {};
          ctrl.actions = {};

          ctrl.actions.diffServices = diffServices;
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

              ctrl.data.apiDocsModels = appService.getApiDocsModels();
              ctrl.data.localApiDocsModels = appService.getLocalApiDocsModels();
          }

          function diffServices() {
              $state.go('services');
          }

          function diffData() {
              $state.go('processor');
          }

      }
    ]);
})();
