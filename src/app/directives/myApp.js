angular.module('twitter').
directive('myMap', function() {
  // directive link function
  var link = function($scope, element, attrs) {
    var map, markers = [];
    // map config
    var mapOptions = {
      center: new google.maps.LatLng(50, 2),
      zoom: 4,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      scrollwheel: false
    };

    // init the map
    function initMap() {
      if (map === void 0) {
        map = new google.maps.Map(element[0], mapOptions);
      }
    }

    function addMarker(location) {
      var marker = new google.maps.Marker({
        position: location,
        map: map
      });
      markers.push(marker);
    }

    function clearMarkers() {
      setMapOnAll(null);
    }
    function setMapOnAll(map) {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
      }
    }

    // show the map and place some markers
    initMap();
    google.maps.event.addListener(map, 'click', function (event) {
      clearMarkers();
      $scope.click_map(event.latLng);
      addMarker(event.latLng);
    });
    // setMarker(map, new google.maps.LatLng(51.508515, -0.125487), 'London', 'Just some content');
  };

  return {
    restrict: 'A',
    template: '<div id="gmaps"></div>',
    replace: true,
    link: link
  };
});
