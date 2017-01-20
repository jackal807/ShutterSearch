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
        },
        languages: function() {
            return [{"label" : "Cecoslovacco", "value" : "cs"}, {"label" : "Danese", "value" : "da"}, {"label" : "Tedesco", "value" : "de"}, {"label" : "Inglese", "value" : "en"}, {"label" : "Spagnolo", "value" : "es"}, {"label" : "Finlandese", "value" : "fi"}, {"label" : "Francese", "value" : "fr"}, {"label" : "Ungherese", "value" : "hu"}, {"label" : "Italiano", "value" : "it"}, {"label" : "Giapponese", "value" : "ja"}, {"label" : "Coreano", "value" : "ko"}, {"label" : "Norvegese", "value" : "nb"}, {"label" : "Olandese", "value" : "nl"}, {"label" : "Polacco", "value" : "pl"}, {"label" : "Portoghese", "value" : "pt"}, {"label" : "Russo", "value" : "ru"}, {"label" : "Svedese", "value" : "sv"}, {"label" : "Tailandese", "value" : "th"}, {"label" : "Turco", "value" : "tr"}, {"label" : "Cinese", "value" : "zh"}];
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