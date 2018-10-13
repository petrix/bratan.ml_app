$(document).ready(function () {
//////----PRELOAD IMAGES----//////
  function preload(arrayOfImages) {
    $(arrayOfImages).each(function(){
        $('<img/>')[0].src = this;
    });
   } 
    preload([
      'img/plast_logo.png',
      'img/plast_paused.png',
      'img/BG_2.jpg'
  ]);
//////----END OF PRELOAD IMAGES----//////

//////----EQUALIZER----//////
var eqDisplay = false;
$('.eq').click(function(){
  if(!eqDisplay){
  $('.spinner-module').css('display', 'none');
  $('.songmodule').css('display', 'none');
  $('.equalizer').css('display', 'block');
  eqDisplay = true;
  }else{
    $('.spinner-module').css('display', 'block');
  $('.songmodule').css('display', 'block');
  $('.equalizer').css('display', 'none');
  eqDisplay = false;
  }
});



//////----END OF EQUALIZER----//////




//////----AUDIO PLAYER----//////
  $('audio').data('bpm', '1');
  $('.spinner-module').click(function () {
    var $this = $(this),
      audio = $this.siblings('audio')[0],
      bpm = $this.siblings('audio').data('bpm');
      audio.volume = 0;
    if (audio.paused) {
      audio.load();
      audio.play();
      $('audio').animate({volume: 1}, 1000);
        spinWidth = $('#spinner').width();
      $('#spinner').css({'background':'url("img/plast_logo.png") center center no-repeat','background-size': spinWidth + 'px ' + spinWidth + 'px','animation': 'spin-cw 20s linear infinite', 'transition':'all 1500ms'});
    } else {
      $('#spinner').css({'background':'url("img/plast_paused.png") center center no-repeat','background-size': spinWidth + 'px ' + spinWidth + 'px','animation-play-state': 'paused', 'transition':'all 1500ms'});
      // $('audio').animate({volume: 0}, 5000);
      $('audio').animate({volume: 0}, 1000);
      audio.pause();
    }
  });
//////----END OF AUDIO PLAYER----//////



//////----MARQUEE----//////
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
      //////----CHECK INTERNET CONNECTION----//////
      if(navigator.onLine){
        $.getJSON('http://radiobratan.tk:88/api/nowplaying', function (data) {
        $('.songtitle').html(data[0].now_playing.song.text);
        slideLeft = $('.songmodule').width();
      });
      }else {
            $('.songtitle').html('the INTERNET connection is totally fucked up!');
            slideLeft = $('.songmodule').width() + step;
        }
      //////----END OF CHECK INTERNET CONNECTION----//////
    }
    slideLeft -= step;

  }
  clearInterval(intId);
  intId = setInterval(intervalId, 1000);
//////----END OF MARQUEE----//////

//////----STATUS----//////
var statId;
  var statusId = function () {
    if(navigator.onLine){
      $('.status').html('online');
      $.getJSON('http://radiobratan.tk:88/api/nowplaying', function (data) {
      $('.songstatus').css('width', (data[0].now_playing.elapsed / data[0].now_playing.duration) * 100 + '%');
    });
  }else{
    $('.songstatus').css('width', 100 + '%');
    $('.status').html('offline');
  }

      }
  clearInterval(statId);
  statId = setInterval(statusId, 5000);
//////----END OF STATUS----//////


});