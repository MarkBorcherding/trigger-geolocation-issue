$(function(){
  var log = forge.logging.debug;

  var $forge = $("#forge-geolocation");
  var $watch = $("#watchLocation");
  var $current = $("#getCurrentPosition");

  var printLocation = function($ol, pos) {
    var lng = pos.coords.longitude;
    var lat = pos.coords.latitude;
    var accuracy = pos.coords.accuracy;
    $ol.prepend("<li>" +
                   "<span class='lng'>" + lng + "</span>" +
                   "<span class='lat'>" + lat + "</span>" +
                   "<span class='accuracy'>" + accuracy + "</span>" +
                "</li>");
  };

  var printError = function($ol) {
    $ol.prepend("<li>error</li>");
  };

  var options = {
    "enableHighAccuracy": true
  };

  var printForge = function(pos) { printLocation($forge, pos); };
  var errorForge = function() { printError($forge); };

  var printCurrent = function(pos) { printLocation($current, pos); };
  var errorCurrent = function() { printError($current); };

  var printWatch = function(pos) { printLocation($watch, pos); };
  var errorWatch = function() { printError($watch); };

  setInterval( function(){
    forge.geolocation.getCurrentPosition( printForge, errorForge, options);
    navigator.geolocation.getCurrentPosition(printCurrent, errorCurrent, options);
  }, 500);

  navigator.geolocation.watchPosition( printWatch, errorWatch, options);

});
