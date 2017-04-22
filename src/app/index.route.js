(function() {
  'use strict';

  angular
    .module('twitter')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/views/tweets_list.html',
        controller: 'TweetsList',
        controllerAs: 'main'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
