var app = angular.module('ShutterSearch', ['ngMaterial', 'ngMdIcons', 'ShutterSearchServices']).config(function($mdThemingProvider, $httpProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('deep-purple')
    .accentPalette('amber', {
      'default': '900', // by default use shade 400 from the pink palette for primary intentions
      'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
      'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
      'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
    })
    .warnPalette('blue');
    
     $httpProvider.interceptors.push('InterceptorSrvc');
});

app.controller('MainCtrl', ['$scope', '$interval', '$http', '$window', '$timeout', '$mdDialog', 'RestSrvc', function($scope, $interval, $http, $window, $timeout, $mdDialog, RestSrvc) {
 
  $scope.showAdvanced = function(ev, type, keyword) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'dialog1.tmpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: $scope.customFullscreen, // Only for -xs, -sm breakpoints.
      locals: {
        "preview": {
            "type": type,
            "keyword": keyword,
            "lang": $scope.lang
        }
      }
    })
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
  };
    
    function DialogController($scope, $mdDialog, RestSrvc, preview) {
   
    $scope.preview = preview;
    $scope.previewLoading = true;
        
    $scope.previewToolbarClass = {
        "photo" : "md-primary",
        "illustration" : "md-warn",
        "vector" : "md-accent"
    };
        
    
        
    $scope.getPreviewImages = function() {
        var t = preview.type;
        if(t == 'illustration') t = '';
        var config = {
                "params" : {
                    "query" : preview.keyword, 
                    "per_page": 9, 
                    "page": 1,
                    "language" : preview.lang,
                    "image_type" : t
            }
        }
        RestSrvc.search(config).then(function(response) {
            console.log(response)
            $scope.previewImages = response.data.data.map(function(e) {
                return {"url" : e.assets.small_thumb.url, "descr": e.description}});
            $scope.previewLoading = false;
        });
    }
    
    $scope.getPreviewImages();
        
    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.more = function() {
 	  $window.open('https://www.shutterstock.com/search?search_source=base_landing_page&language=' + $scope.preview.lang + '&searchterm=' + $scope.preview.keyword +  '&image_type=' + $scope.preview.type, '_blank');
    };
  }
    

    $scope.openMenu = function($mdOpenMenu, ev) {
      $mdOpenMenu(ev);
    };
    
    $scope.languages = RestSrvc.languages();
    $scope.lang = 'it';
  

   $scope.type = "vector";
   $scope.sortAttrs = ["total", "photos", "illustrations", "vectors"];
   $scope.sortAttr = "total";
  
    
    
   var finishLoading = function(item) {
    if(!item["attempts"]) item["attempts"] = 1;
    else item["attempts"]++;
  	if(item.photos && item.vectors && item.illustrations && item.total) return 1;
    else if(!((item.photos && item.vectors && item.illustrations && item.total)) && item["attempts"] == 4) return 2;
    else return 0;
  }
   
   
   $scope.sortAttr = "total";
    
    
    
    
  $scope.init= function() {
    var config = {};
    
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
        
        RestSrvc.search(config).then(function(r) {
                      value["total"] = r.data.total_count;
                      
                      if(finishLoading(value)==1 || finishLoading(value)==2) value["loading"] = false;
                        });
                      RestSrvc.search(configs[0]).then(function(r) {
                      value["photos"] = r.data.total_count;
                      if($scope.type == 'photo') value["previewUrl"] = r.data.data[0].assets.preview.url;
                      if(finishLoading(value)==1 || finishLoading(value)==2) value["loading"] = false;
    									});
                      RestSrvc.search(configs[1]).then(function(r) {
                      value["illustrations"] = r.data.total_count;
                      if(finishLoading(value)==1 || finishLoading(value)==2) value["loading"] = false;
    									});
                      RestSrvc.search(configs[2]).then(function(r) {
                      value["vectors"] = r.data.total_count;
                      if($scope.type == 'vector') value["previewUrl"] = r.data.data[0].assets.preview.url;
                      if(finishLoading(value)==1 || finishLoading(value)==2) value["loading"] = false;
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
  
  
  
  
  
  RestSrvc.popular(config).then(function(response) {
    	$scope.res = response.data.data.map(function(e){return {"label" : e}});
        $scope.init();
 })//fine funzione response
 } //fine funzione search
 
 $scope.openShutterSearch = function(item) {
 	$window.open('https://www.shutterstock.com/search?search_source=base_landing_page&language=' + $scope.lang + '&searchterm=' + item.label + '&image_type=' + $scope.type, '_blank');
 };
          
}]);


app.filter('shortener', function () {
    return function(text, length) {
        if (!text) return "";
        if (!length || length < 1) {
            length = 100;
        }
        if (text.length <= length) return text;
        text = text.substr(0, length);

        var index = text.lastIndexOf(' ');
        if (index >= 0) text = text.substr(0, index);
        return text + ' ...';
    }
});

 