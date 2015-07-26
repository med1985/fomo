(() => {

  let ApiConfig = (RestangularProvider, config) => {
    RestangularProvider.setBaseUrl(config.apiURL);
    RestangularProvider.setDefaultHttpFields({
      withCredentials: true
    });
    RestangularProvider.addResponseInterceptor((data, operation, what, url, response, deferred) => {
      return angular.copy(JSOG.decode(data));
    });
    RestangularProvider.setDefaultHeaders({ fbAuth: () => { return window.localStorage.fbAuth; } });
  };
  ApiConfig.$inject = ['RestangularProvider', 'config'];


  let DefaultRouteConfig = ($urlRouterProvider) => {
    $urlRouterProvider.otherwise('/events');
  };
  DefaultRouteConfig.$inject = ['$urlRouterProvider'];


  let CorsConfig = ($httpProvider) => {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  };
  CorsConfig.$inject = ['$httpProvider'];


  let dependencies = [
    'ionic',
    'fomo.events',
    'fomo.config',
    'fomo.login',
    'ngCookies'
  ];


  angular
    .module('fomo', dependencies)
    .config(ApiConfig)
    .config(DefaultRouteConfig)
    .config(CorsConfig)
    .run(function ($ionicPlatform) {
      $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
          // org.apache.cordova.statusbar required
          StatusBar.styleLightContent();
        }
      });
    })

    .run(['$rootScope', '$state', 'Restangular', ($rootScope, $state, Restangular) => {
      $rootScope.$on("$stateChangeError", console.log.bind(console));
      Restangular.setErrorInterceptor(function(response, deferred, responseHandler) {
        if(response.status === 403 || response.status === 401) {
          // Don't have state object ... can't seem to get it for some reason...
          $state.go('login');
          return false; // error handled
        }
        return true; // error not handled
      });
    }]);

})();
