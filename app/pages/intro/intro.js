(function () {
    'use strict';

    angular.module('pmajs.pages.intro', [
      'pmajs'
  ]).controller('IntroController', ['$scope', '$rootScope', '$state', 'appDataService', 'appService',
      function ($scope, $rootScope, $state, appDataService, appService) {
          var ctrl = this;
          ctrl.status = {};
          ctrl.data = {};
          ctrl.actions = {};

          ctrl.actions.syncApiDocs = syncApiDocs;

          appService.clearData();

          ctrl.data.frameworks = appService.getFrameworks();
		  ctrl.data.framework = JSON.stringify(ctrl.data.frameworks[0]);

          $scope.$watch(function () {
              return ctrl.data.localApiDocsJson;
          }, function (newLocalApiDocsJson) {
              if (!newLocalApiDocsJson) {
                  appService.clearData();
                  return;
              }

              var reader = new FileReader();
              reader.onload = function (e) {
                  var localApiDocsJson = JSON.parse(reader.result);
                  appService.setLocalApiDocs(localApiDocsJson);
              }
              reader.readAsText(newLocalApiDocsJson);
          });

          $scope.$watch(function () {
              return ctrl.data.framework;
          }, function (newFramework) {
              if (!newFramework) {
                  return; 
              }

              newFramework = JSON.parse(newFramework);
              appService.setFramework(newFramework);

              if (newFramework.id == 'angular_v2') {
				  alert('Angular 2 is not fully supported - TO BE IMPLEMENTED');
			  }
          });


          // implementations
          function syncApiDocs(itemAppName, itemApiDocUrl) {
              ctrl.status.isLoading = true;
              $rootScope.appName = itemAppName;
              appDataService.getApiDocs(itemApiDocUrl).then(function (resultApiDocs) {
                  appService.setApiDocs(resultApiDocs);
                  $state.go('models');
              }, function (resultErrorMessage) {
                  alert(resultErrorMessage);
              }).finally(function () {
                  ctrl.status.isLoading = false;
              });
          }
      }
    ]);
})();
