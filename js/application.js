var app = angular.module('ShutterSearch', ['ngMaterial', 'ngMdIcons']).config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('deep-purple')
    .accentPalette('orange')
    .warnPalette('blue');
});

app.controller('MainCtrl', ['$scope', '$interval', '$http', '$window', '$timeout', function($scope, $interval, $http, $window, $timeout) {
 
  
  var originatorEv;

    $scope.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };
  
  $scope.languages = [{"label" : "Cecoslovacco", "value" : "cs"}, {"label" : "Danese", "value" : "da"}, {"label" : "Tedesco", "value" : "de"}, {"label" : "Inglese", "value" : "en"}, {"label" : "Spagnolo", "value" : "es"}, {"label" : "Finlandese", "value" : "fi"}, {"label" : "Francese", "value" : "fr"}, {"label" : "Ungherese", "value" : "hu"}, {"label" : "Italiano", "value" : "it"}, {"label" : "Giapponese", "value" : "ja"}, {"label" : "Coreano", "value" : "ko"}, {"label" : "Norvegese", "value" : "nb"}, {"label" : "Olandese", "value" : "nl"}, {"label" : "Polacco", "value" : "pl"}, {"label" : "Portoghese", "value" : "pt"}, {"label" : "Russo", "value" : "ru"}, {"label" : "Svedese", "value" : "sv"}, {"label" : "Tailandese", "value" : "th"}, {"label" : "Turco", "value" : "tr"}, {"label" : "Cinese", "value" : "zh"},];
  
  $scope.lang = 'it';

	$scope.headers = {'Authorization': 'Basic ZTVjZTZkYjljNzE0ZjM3ZDA5OTM6ZTgyMWI2YTNkOTI1YzZjZThiM2QzZGE1MTk0ZGNjZGFiZGFjOTczZA=='}

   $scope.type = "vector";
   $scope.sortAttrs = ["total", "photos", "illustrations", "vectors"];
   $scope.sortAttr = "total";
  
    
    
   var finishLoading = function(item) {
  	if(item.photos && item.vectors && item.illustrations && item.total) return true;
    else return false;
  }
   
   
   $scope.sortAttr = "total";
    
    
    
    
  $scope.init= function() {
    var searchUrl = "https://api.shutterstock.com/v2/images/search";
    var config = {headers : $scope.headers};
    
    let promise = $timeout();
    angular.forEach($scope.res, function(value, key) {
      value["loading"] = true;
      promise = promise.then(function() {
         
    
      config.params = {"query" : value.label, "per_page": 1, "language" : $scope.lang};
      
      
      var configs = [];
        for(var i=0; i<3; i++) {
        	configs.push(JSON.parse(JSON.stringify(config)));
          switch(i) {
          	case 0:
            	configs[i].params["image_type"] = "photo";
              break;
            case 1:
            	configs[i].params["image_type"] = "illustration";
              break;
            case 2:
            	configs[i].params["image_type"] = "vector";
              break;
          }
        }
        
        $http.get(searchUrl, config).then(function(r) {
                      value["total"] = r.data.total_count;
                      console.log(r)
                      value["previewUrl"] = r.data.data[0].assets.preview.url;
                      
                      if(finishLoading(value)) value["loading"] = false;
    									});
                      $http.get(searchUrl,configs[0]).then(function(r) {
                      value["photos"] = r.data.total_count;
                      if(finishLoading(value)) value["loading"] = false;
    									});
                      $http.get(searchUrl, configs[1]).then(function(r) {
                      value["illustrations"] = r.data.total_count;
                      if(finishLoading(value)) value["loading"] = false;
    									});
                      $http.get(searchUrl, configs[2]).then(function(r) {
                      value["vectors"] = r.data.total_count;
                      if(finishLoading(value)) value["loading"] = false;
    									});
      
        return $timeout(300);
     });
		}); //fine foreach
  } //fine ordina
  

  
  $scope.ordina = function(sortAttr) {$scope.sortAttr = sortAttr;}
   
   
   
    
   $scope.search = function() {
   $scope.res = [];
   var data = { "image_type" : $scope.type, "language" : $scope.lang };

  var config = {
   params: data,
   headers : $scope.headers
  };
  
  
  
  
  
  $http.get('https://api.shutterstock.com/v2/images/search/popular/queries', config).then(function(response) {
    	$scope.res = response.data.data.map(function(e){return {"label" : e}});
        $scope.init();
 })//fine funzione response
 } //fine funzione search
 
 $scope.openShutterSearch = function(item) {
 	$window.open('https://www.shutterstock.com/search?search_source=base_landing_page&language=' + $scope.lang + '&searchterm=' + item.label + '&image_type=' + $scope.type, '_blank');
 };
          
}]);
 