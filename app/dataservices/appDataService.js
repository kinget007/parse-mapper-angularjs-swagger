(function () {
    'use strict';

    angular.module('pmajs.dataservices.appDataService', ['pmajs'])
        .factory('appDataService', ['$rootScope', '$http', '$q', 'appService',
            function ($rootScope, $http, $q, appService) {

                var service = this;
                var proxy = location.protocol + '//' + location.hostname + ':54322/';

                service.getApiDocs = getApiDocs;

                return service;


                // implementations
                function getApiDocs(itemApiDocUrl) {
                    var deferred = $q.defer();

                    $http({
                        url: proxy + itemApiDocUrl,
                        method: 'GET'
                    }).then(function (resultApiDocsJson) {
                        var apiDocs = resultApiDocsJson && resultApiDocsJson.data;

                        if (typeof (apiDocs) != 'object' || (apiDocs.swagger != '2.0' && !(apiDocs.swaggerVersion == '1.2' && !apiDocs.basePath))) {
                            deferred.reject('Invalid Swagger API DOCS URL !');
                            return;
                        }

                        if (apiDocs.swagger == '2.0') {
                            deferred.resolve(apiDocs);
                        } else {
                            getApiEndpoints(itemApiDocUrl, apiDocs).then(function(resultApiEndpoints) {
                                apiDocs.apiEndpoints = resultApiEndpoints;
                                deferred.resolve(apiDocs);
                            }, function(resultErrorMessage) {
                                deferred.reject(resultErrorMessage);
                            });
                        }
                    }, function (resultErrorMessage) {
                        deferred.reject('Something went wrong...\nError: ' + (resultErrorMessage && resultErrorMessage.data && resultErrorMessage.data.response || 'Unknown'));
                    });

                    return deferred.promise;
                }

                function getApiEndpoints(itemApiDocUrl, itemApiDocs) {
                    var deferred = $q.defer();

                    var qApiEndpoints = itemApiDocs.apis.map(function (itemApiDoc) {
                        return $http.get(proxy + itemApiDocUrl + itemApiDoc.path);
                    });

                    $q.all(qApiEndpoints).then(function (result) {
                        var apiEndpoints = result.map(function (itemResult) {
                            return itemResult.data;
                        });

                        deferred.resolve(apiEndpoints);
                    }, function (resultErrorMessage) {
                        deferred.reject('Something went wrong...\nError: ' + (resultErrorMessage && resultErrorMessage.data && resultErrorMessage.data.response || 'Unknown'));
                    });

                    return deferred.promise;
                }
            }]);
})();
