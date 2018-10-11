$(document).ready(function () {
  var intId;
  var ww, w , yLength;
  var step = 80;
  // if($('.main').width() < 400){
    // w = $('.main').width();
  // }else{
  // w = ($('.main').width() - $('.songmodule').width()) / 2 + $('.songmodule').width();
  w = $('.songmodule').width();
  // }
  ww = w;


  var intervalId = function () {

    // $(window).resize(function () {
    //   $('.songtitle').addClass('opacity');
    //   w = $('.songmodule').width();
    // });
    
    // console.log('ww - ' + ww);
    
    // var yLength = ww + $('.songtitle').html().length * (parseFloat($('.songtitle').css('font-size'))) / 1.7;
    yLength = w + $('.songtitle').width()+(w/10);
// console.log('songtitle - '+$('.songtitle').width());
// console.log('ww - ' + ww);
// console.log('songmodule width - ' + w);
// console.log('yLength - ' + yLength);
// console.log('main width - ' + $('.main').width());
// console.log($('.songtitle').html().length * parseFloat($('.songtitle').css('font-size')) / 1.7);

    if ((ww + (yLength-w)) > 0) {
      $('.songtitle').css('transform', 'translateX(' + ww + 'px)');
      if (ww < (w-(w/10))) {
        $('.songtitle').removeClass('opacity');
    }
    } else {
      $('.songtitle').addClass('opacity');
      $.getJSON('http://radiobratan.tk:88/api/nowplaying', function (data) {
        $('.songtitle').html(data[0].now_playing.song.text);
      });
      ww = w + step*2;
      
    }

    ww -= step;

  }
  clearInterval(intId);
  intId = setInterval(intervalId, 1000);

});