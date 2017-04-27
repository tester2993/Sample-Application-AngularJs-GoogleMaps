angular.module('twitter').factory('twitterService', function($resource, $q) {

    var authorizationResult = false;

    return {
        initialize: function() {
            //initialize OAuth.io with public key of the application
            OAuth.initialize('7L5zqtM8lqU-3LyFyUcWbCJ1Pss', {cache:true});
            //try to create an authorization result when the page loads, this means a returning user won't have to click the twitter button again
            authorizationResult = OAuth.create('twitter');
        },
        isReady: function() {
            return (authorizationResult);
        },
        connectTwitter: function() {
            var deferred = $q.defer();
            OAuth.popup('twitter', {cache:true}, function(error, result) { //cache means to execute the callback if the tokens are already present
                if (!error) {
                    localStorage.setItem('oauth_token', result.oauth_token);
                    localStorage.setItem('oauth_token_secret', result.oauth_token_secret);

                    authorizationResult = result;
                    deferred.resolve();
                } else {
                  console.log('error: ', error);
                    //do something if there's an error
                }
            });
            return deferred.promise;
        },
        clearCache: function() {
            OAuth.clearCache('twitter');
            authorizationResult = false;
        },
        getLatestTweets: function (params) {
          //create a deferred object using Angular's $q service
            var deferred = $q.defer();
            var promise = authorizationResult.get('/1.1/statuses/home_timeline.json?'+params).done(function(data) { //https://dev.twitter.com/docs/api/1.1/get/statuses/home_timeline
                //when the data is retrieved resolved the deferred object
                deferred.resolve(data)
            });
            //return the promise of the deferred object
            return deferred.promise;
        },
        getTweets: function (params) {
          //create a deferred object using Angular's $q service
          var deferred = $q.defer();
          var promise = authorizationResult.get('/1.1/search/tweets.json?'+params).done(function(data) { //https://dev.twitter.com/docs/api/1.1/get/statuses/home_timeline
            //when the data is retrieved resolved the deferred object
            deferred.resolve(data)
          });
          //return the promise of the deferred object
          return deferred.promise;
        },
        getOEmbed: function (params) {
          var deferred = $q.defer();
          var promise = authorizationResult.get('/1.1/statuses/oembed.json?'+params).done(function(data) { //https://dev.twitter.com/docs/api/1.1/get/statuses/home_timeline
            //when the data is retrieved resolved the deferred object
            deferred.resolve(data)
          });
          //return the promise of the deferred object
          return deferred.promise;
        },
        getUserData: function () {
          var deferred = $q.defer();
          var promise = authorizationResult.get('/1.1/account/verify_credentials.json').done(function(data) { //https://dev.twitter.com/docs/api/1.1/get/statuses/home_timeline
            //when the data is retrieved resolved the deferred object
            deferred.resolve(data)
          });
          //return the promise of the deferred object
          return deferred.promise;
        }
    }

});
