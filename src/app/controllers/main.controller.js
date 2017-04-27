var app = angular.module('twitter').controller('MainCtrl', function($scope, $q, twitterService) {
  $scope.tweets = []; //array of tweets
  twitterService.initialize();

  $scope.auth_status = function () {
    return twitterService.isReady()
  };

  //when the user clicks the connect twitter button, the popup authorization window opens
  $scope.connectButton = function() {
    twitterService.connectTwitter().then(function() {
      if (twitterService.isReady()) { //if the authorization is successful,
        twitterService.getUserData().then(function(data) {
          localStorage.setItem('username', data.name);
          localStorage.setItem('profile_image_url', data.profile_image_url);
          $scope.getUserData()
        })
      }
    });
  };

  $scope.getUserData = function(){
    $scope.username = localStorage.getItem('username');
    $scope.profile_image_url = localStorage.getItem('profile_image_url');
  };

  //sign out clears the OAuth cache, the user will have to reauthenticate when returning
  $scope.signOut = function() {
    twitterService.clearCache();
    localStorage.removeItem('oauth_token');
    localStorage.removeItem('oauth_token_secret');
    localStorage.removeItem('username');
    localStorage.removeItem('profile_image_url');
    $scope.tweets.length = 0;
  }

});

