angular.module('twitter').controller('GoogleMapsCtrl', function($scope) {
  $scope.click_map = function (latLng) {
    $scope.getTweets(false, latLng);
  }
});
