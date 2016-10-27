(function () {
    'use strict';

    angular.module('pmajs.pages.processor', [
      'pmajs'
  ]).controller('ProcessorController', ['$scope', '$state', '$timeout', 'appDataService', 'appService',
      function ($scope, $state, $timeout, appDataService, appService) {
          var ctrl = this;
          ctrl.status = {};
          ctrl.data = {};
          ctrl.actions = {};

          ctrl.data.framework = appService.getFramework();

          ctrl.actions.diffModels = diffModels;
          ctrl.actions.diffServices = diffServices;

          ctrl.actions.downloadApiDocs = downloadApiDocs;
          ctrl.actions.downloadBaseService = downloadBaseService;

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

              ctrl.data.apiDocsModelsData = appService.getApiDocsModelsData();
              ctrl.data.localApiDocsModelsData = appService.getLocalApiDocsModelsData();
          }

          function diffModels() {
              if (ctrl.status.isDiffData == 'models') {
                  downloadModels();
              }

              ctrl.status.isDiffData = 'models';
          }

          function diffServices() {
              if (ctrl.status.isDiffData == 'services') {
                  downloadServices();
              }

              ctrl.status.isDiffData = 'services';
          }

          function downloadApiDocs() {
              download('apiDocs.json', JSON.stringify(ctrl.data.apiDocs));
          }

          function downloadBaseService() {
              if (ctrl.data.framework.id == 'angular_v2') {
                  alert('base service for angular v2 to be implemented');
                  return;
              }

              download('dataService.js', ctrl.data.baseServiceData);
          }

          function downloadModels() {
              if (ctrl.data.framework.id == 'angular_v2') {
                  alert('models for angular v2 to be implemented');
              } else {
                  alert('invalid framework detected');
              }

              download('models.js', ctrl.data.apiDocsData);
          }

          function downloadServices() {
              if (ctrl.data.framework.id == 'angular_v2') {
                  alert('services for angular v2 to be implemented');
                  return;
              }

              download('dataServices.js', ctrl.data.apiDocsData);
          }

          function download(fileName, fileContent) {
              var element = document.createElement('a');
              element.style.display = 'none';
              element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(fileContent));
              element.setAttribute('download', fileName);
              document.body.appendChild(element);
              element.click();
              document.body.removeChild(element)
          }
      }
    ]);
})();
