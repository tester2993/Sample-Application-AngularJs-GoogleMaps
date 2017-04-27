var app = angular.module('twitter');

app.controller('TweetsList', function($scope, $q, twitterService, $resource, $timeout) {
  twitterService.initialize();
  $scope.latLng;
  $scope.MoreTweetsTitle = 'Get More Tweets';

  $scope.init = function() {
      $scope.tweetsResult = []; // empty tweet model
      $scope.getTweets();
  };

  $scope.getTweets = function (paging, latLng) {
    if (latLng){
      $scope.latLng = latLng;
      $scope.tweetsResult = [];
    }
    if (angular.isUndefined(paging)) {
      $scope.tweetsResult = [];
    }
    $scope.Tweets();
  };

  $scope.Tweets = function () {
      var date = new Date(), params;
      var today = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();

      if ($scope.latLng){
        params ='q=&geocode='+$scope.latLng.lat()+','+$scope.latLng.lng()+',1km';
      }else {
        params = "q=" + today+"&count=" + 5;
      }
      if ($scope.maxId) {
        params += "&max_id=" + $scope.maxId;
      }

      twitterService.getTweets(params).then(function (result) {
      $scope.tweets = result.statuses ? result.statuses : result;
      if ($scope.tweets[0]){
        $scope.emptyTweets = false;
        $scope.maxId = ($scope.tweets[$scope.tweets.length - 1].id) - 100;
        $scope.oEmbed()
      }else{
        $scope.emptyTweets = true;
        $scope.MoreTweetsTitle = 'No others Tweets';
        $timeout(function () {
          twttr.widgets.load();
        }, 30);
      }
    });
  };

  $scope.oEmbed = function () {
    angular.forEach($scope.tweets, function(value, key) {
      var oEmbed_params = 'id='+value.id_str+'&maxwidth=305&hide_thread=true&omit_script=true';
      twitterService.getOEmbed(oEmbed_params).then(function (data) {
        $scope.tweets[key].oEmbed = data;
        $scope.tweetsResult.push($scope.tweets[key]);
        $timeout(function () {
          twttr.widgets.load();
        }, 30);
      })
    });
  };

  /**
   * binded to 'Get More Tweets' button
   */
  $scope.getMoreTweets = function () {
    $scope.tweets = [];
    $scope.getTweets(true);
  };

  if ($scope.auth_status){
    $scope.init();
    $scope.getUserData()
  }

});
