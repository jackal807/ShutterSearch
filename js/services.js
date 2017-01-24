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
            return [{"label" : "Cecoslovacco", "value" : "cs", "flag" : "cz"}, {"label" : "Danese", "value" : "da", "flag" : "dk"}, {"label" : "Tedesco", "value" : "de", "flag" : "de"}, {"label" : "Inglese", "value" : "en", "flag" : "gb"}, {"label" : "Spagnolo", "value" : "es", "flag" : "es"}, {"label" : "Finlandese", "value" : "fi", "flag" : "fi"}, {"label" : "Francese", "value" : "fr", "flag" : "fr"}, {"label" : "Ungherese", "value" : "hu", "flag" : "hu"}, {"label" : "Italiano", "value" : "it", "flag" : "it"}, {"label" : "Giapponese", "value" : "ja", "flag" : "jp"}, {"label" : "Coreano", "value" : "ko", "flag" : "kr"}, {"label" : "Norvegese", "value" : "nb", "flag" : "no"}, {"label" : "Olandese", "value" : "nl", "flag" : "nl"}, {"label" : "Polacco", "value" : "pl", "flag" : "pl"}, {"label" : "Portoghese", "value" : "pt", "flag" : "pt"}, {"label" : "Russo", "value" : "ru", "flag" : "ru"}, {"label" : "Svedese", "value" : "sv", "flag" : "se"}, {"label" : "Tailandese", "value" : "th", "flag" : "th"}, {"label" : "Turco", "value" : "tr", "flag" : "tr"}, {"label" : "Cinese", "value" : "zh", "flag" : "cn"}];
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