$(document).ready(function () {
  var intId;
  var intervalId = function () {
    $.getJSON('http://radiobratan.tk:88/api/nowplaying', function (data) {
      $('.songstatus').css('width', (data[0].now_playing.elapsed / data[0].now_playing.duration) * 100 + '%');
    });
  }
  clearInterval(intId);
  intId = setInterval(intervalId, 5000);
});