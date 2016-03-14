var map;

var gradient4 = [
    'rgba(0, 255, 255, 0)',
    'rgba(0, 255, 255, 1)',
    'rgba(0, 191, 255, 1)',
    'rgba(0, 127, 255, 1)',
    'rgba(0, 123, 255, 1)',
    'rgba(0, 110, 255, 1)',
    'rgba(0, 90, 223, 1)',
    'rgba(0, 90, 191, 1)',
    'rgba(0, 80, 159, 1)',
    'rgba(0, 40, 127, 1)',
    'rgba(0, 30, 255, 1)',
];
var gradient3 = [
    'rgba(255, 0, 50, 0)',
    'rgba(255, 0, 70, 1)',
    'rgba(255, 0, 80, 1)',
    'rgba(255, 0, 140, 1)',
    'rgba(255, 0, 150, 1)',
    'rgba(255, 0, 155, 1)',
    'rgba(255, 0, 150, 1)',
    'rgba(255, 0, 174, 1)',
    'rgba(255, 20, 174, 1)',
    'rgba(255, 40, 174, 1)',
    'rgba(255, 50, 174, 1)',
    'rgba(255, 80, 174, 1)',
    'rgba(255, 100, 174, 1)',
    'rgba(255, 109, 174, 1)'
];

function initMap() {

map = new google.maps.Map(document.getElementById('map'), {
  zoom: 12,
  maxZoom: 17,
  minZoom: 11,
  center: {lat: 59.3278, lng: 18.06488},
  mapTypeId: google.maps.MapTypeId.ROADMAP,
  styles: [{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"on"},{"saturation":-100},{"lightness":20}]},{"featureType":"road","elementType":"all","stylers":[{"visibility":"on"},{"saturation":-100},{"lightness":40}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"on"},{"saturation":-10},{"lightness":30}]},{"featureType":"landscape.man_made","elementType":"all","stylers":[{"visibility":"simplified"},{"saturation":-60},{"lightness":10}]},{"featureType":"landscape.natural","elementType":"all","stylers":[{"visibility":"simplified"},{"saturation":-60},{"lightness":60}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"},{"saturation":-100},{"lightness":60}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"},{"saturation":-100},{"lightness":60}]}]
});

}
// Heatmap data: 500 Points
function plotOverlays(downPayment) {

  var affordablePoints = [];
  var notAffordablePoints = [];

  //Divide the data into the two arrays.
  jsonData.map( function(item){

    var position = item.location.position;

    var googleLatLng = new google.maps.LatLng(position.latitude, position.longitude);

    if( (item.soldPrice * 0.15) > downPayment ) {
      affordablePoints.push(googleLatLng);
    } else {
      notAffordablePoints.push(googleLatLng);
    }

  });

  //Create overlays
  var heatmapCanAfford = new google.maps.visualization.HeatmapLayer({
    data: affordablePoints,
    map: map
  });
  heatmapCanAfford.setOptions({
    gradient: heatmapCanAfford.get('gradient') ? null : gradient3,
  });

  var heatmapCantAfford = new google.maps.visualization.HeatmapLayer({
    data: notAffordablePoints,
    map: map
  });

  heatmapCantAfford.setOptions({
    gradient: heatmapCantAfford.get('gradient') ? null : gradient4,
  });

}


// Set listener on the <input> with id 'downPayment'
$("#downPayment").keypress(function(e) {
  if( e.which == 13) {
    var downPayment = $(this).val();
    plotOverlays(downPayment);
    $.fn.fullpage.moveSectionDown();
  }
})
