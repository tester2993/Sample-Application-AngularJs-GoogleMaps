(function() {
  'use strict';

  angular
    .module('twitter')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('Home', {
        url: '/',
        templateUrl: 'app/views/main.html',
        controller: 'MainCtrl'
      });
    $urlRouterProvider.otherwise('/');
  }

})();
