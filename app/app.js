(function () {
    'use strict';

    angular.module('pmajs', [
      'ui.router',
      'ngSanitize',
      'ngAnimate',
      'ngMessages',
      'ngMaterial',
      'diff-match-patch',
      'ngFileUpload',
      'pmajs.pages.intro',
      'pmajs.pages.models',
      'pmajs.pages.services',
      'pmajs.pages.processor',
      'pmajs.services.appService',
      'pmajs.dataservices.appDataService',
      'pmajs.directives.renderData'
    ]).config(['$stateProvider', '$urlRouterProvider',
      function ($stateProvider, $urlRouterProvider) {
          $urlRouterProvider.otherwise('/intro');
          $stateProvider.state("intro", {
              url: "/intro",
              templateUrl: 'pages/intro/intro.html',
              controller: 'IntroController as introCtrl'
          }),
		  $stateProvider.state("models", {
              url: "/models",
              templateUrl: 'pages/models/models.html',
              controller: 'ModelsController as modelsCtrl'
          }),
          $stateProvider.state("services", {
              url: "/services",
              templateUrl: 'pages/services/services.html',
              controller: 'ServicesController as servicesCtrl'
          }),
          $stateProvider.state("processor", {
              url: "/processor",
              templateUrl: 'pages/processor/processor.html',
              controller: 'ProcessorController as processorCtrl'
          })
      }
    ]).run(['$rootScope', '$state', '$stateParams',
      function ($rootScope, $state, $stateParams) {
          $rootScope.$state = $state;
          $rootScope.$stateParams = $stateParams;
      }
    ]).controller('AppController', ['$scope', '$timeout',
      function ($scope, $timeout) {
          var ctrl = this;
          ctrl.status = {};
          ctrl.data = {};
          ctrl.actions = {};

          ctrl.data.title = 'ParseMapper AngularJS';

          $timeout(function () { // force first init to remove initialization image
              ctrl.status.initialized = true;
          }, 0);
      }
    ]);
})();
