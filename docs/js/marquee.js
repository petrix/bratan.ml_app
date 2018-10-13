$(document).ready(function () {
  var intId;
  var moduleWidth, titleWidth;
  var step = 150;
  // }
  titleWidth = $('.songtitle').width();
  moduleWidth = $('.songmodule').width();
  slideLeft = moduleWidth;


  var intervalId = function () {

    $(window).resize(function () {
      $('.songtitle').removeClass('opacity');
      moduleWidth = $('.songmodule').width();
      // w = $('.songmodule').width();
      titleWidth = $('.songtitle').width();
      slideLeft = moduleWidth;
    });
    // console.log("slideLeft = " + slideLeft);
    // console.log("titleWidth ="+ titleWidth);
    // console.log("moduleWidth = "+ moduleWidth);


    // var yLength = ww + $('.songtitle').html().length * (parseFloat($('.songtitle').css('font-size'))) / 1.7;
    // slideLength = moduleWidth + titleWidth;
    // yLength = w + ($('.songtitle').width()+(w/10));
    if ((slideLeft + $('.songtitle').width()+ step>0)) {
      if( slideLeft < $('.songmodule').width()){
        $('.songtitle').addClass('opacity');
      }
      
      $('.songtitle').css('transform', 'translateX(' + slideLeft + 'px)');
    } else {
      $('.songtitle').removeClass('opacity');
      $.getJSON('http://radiobratan.tk:88/api/nowplaying', function (data) {
        $('.songtitle').html(data[0].now_playing.song.text);
        // titleWidth = $('.songtitle').width();
        slideLeft = $('.songmodule').width();
        // slideLeft = moduleWidth + step;
      });
    }
    slideLeft -= step;

  }
  clearInterval(intId);
  intId = setInterval(intervalId, 1000);

});