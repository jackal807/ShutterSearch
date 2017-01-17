var appServ = angular.module('ShutterSearchServices', []);

appServ.factory('RestSrvc', ['$http', function ($http) {
    return {
        popular: function(params) {
            return $http.get('https://api.shutterstock.com/v2/images/search/popular/queries', params).then(function (response) {
                return response;
            });
        },
        search: function(params) {
            return $http.get('https://api.shutterstock.com/v2/images/search', params).then(function (response) {
                return response;
            });
        }
        
    }
}]);


appServ.factory('InterceptorSrvc', ['$log', function ($log) {
    return {
        request: function (config) {
            config.headers = config.headers || {};
            config.headers['Authorization'] = 'Basic ZTVjZTZkYjljNzE0ZjM3ZDA5OTM6ZTgyMWI2YTNkOTI1YzZjZThiM2QzZGE1MTk0ZGNjZGFiZGFjOTczZA==';
            return config;
        }
    }
}]);