$(document).ready(function () {
  var intId;
  var moduleWidth, titleWidth;
  var step = 120;
  titleWidth = $('.songtitle').width();
  moduleWidth = $('.songmodule').width();
  slideLeft = moduleWidth;


  var intervalId = function () {

    $(window).resize(function () {
      $('.songtitle').removeClass('opacity');
      moduleWidth = $('.songmodule').width();
      titleWidth = $('.songtitle').width();
      slideLeft = moduleWidth;
    });

    if ((slideLeft + $('.songtitle').width()+ step>0)) {
      if( slideLeft < $('.songmodule').width()){
        $('.songtitle').addClass('opacity');
      }
      $('.songtitle').css('transform', 'translateX(' + slideLeft + 'px)');
    } else {
      $('.songtitle').removeClass('opacity');
      $.getJSON('http://radiobratan.tk:88/api/nowplaying', function (data) {
        $('.songtitle').html(data[0].now_playing.song.text);
        slideLeft = $('.songmodule').width();
      });
    }
    slideLeft -= step;

  }
  clearInterval(intId);
  intId = setInterval(intervalId, 1000);

});