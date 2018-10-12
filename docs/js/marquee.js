$(document).ready(function () {
  var intId;
  var windowWidth, moduleWidth, titleWidth;
  var ww, w , yLength;
  var step = 180;
  // }
  titleWidth = $('.songtitle').width();
  moduleWidth = $('.songmodule').width();
  slideLeft = titleWidth + moduleWidth;


  var intervalId = function () {

    $(window).resize(function () {
      $('.songtitle').toggleClass('opacity');
      moduleWidth = $('.songmodule').width();
      // w = $('.songmodule').width();
      slideLeft = moduleWidth;
    });
    console.log(slideLeft);
    // var yLength = ww + $('.songtitle').html().length * (parseFloat($('.songtitle').css('font-size'))) / 1.7;
    slideLength = moduleWidth + titleWidth;
    // yLength = w + ($('.songtitle').width()+(w/10));
    if ((slideLeft + (slideLength - moduleWidth)) > 0) {
      $('.songtitle').removeClass('opacity');
      $('.songtitle').css('transform', 'translateX(' + slideLeft + 'px)');
    } else {
      $('.songtitle').addClass('opacity');
      $.getJSON('http://radiobratan.tk:88/api/nowplaying', function (data) {
        $('.songtitle').html(data[0].now_playing.song.text);
        titleWidth = $('.songtitle').width();
        slideLength = moduleWidth + titleWidth;
        slideLeft = moduleWidth + step;
      });
    }
    slideLeft -= step;

  }
  clearInterval(intId);
  intId = setInterval(intervalId, 1000);

});