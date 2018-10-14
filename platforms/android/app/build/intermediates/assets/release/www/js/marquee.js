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

//////----AUDIO PLAYER----//////
var playingMode = false;
var audio = $('audio')[0];
audio.crossOrigin = "anonymous";
function pushPlay(){
audio.volume = 0;
       audio.load();
      audio.play();
      spinWidth = $('#spinner').width();
      $('#spinner').css({'background':'url("img/plast_logo.png") center center no-repeat','background-size': spinWidth + 'px ' + spinWidth + 'px','animation': 'spin-cw 20s linear infinite', 'transition':'all 700ms'});
      volumeCtrl = ($('#volume').val()/100);
      // volumeCtrl2 = $('#volume').thml($(this).val());
      $(audio).animate({volume: volumeCtrl}, 700, function(){
      playingMode = true;
      });
    }
    function pushPause(){
      $('#spinner').css({'background':'url("img/plast_paused.png") center center no-repeat','background-size': spinWidth + 'px ' + spinWidth + 'px','animation-play-state': 'paused', 'transition':'all 300ms'});
      $(audio).animate({volume: 0}, 300, function(){
        audio.pause();
       playingMode = false;
      });
    }
  $('.spinner-module').click(function () {
    if (!playingMode) {
       pushPlay(); 
    } else {
      pushPause();
    }
  });
//////----END OF AUDIO PLAYER----//////

//////----EQUALIZER WINDOW----//////
var eqDisplay = false;
$('.fa-cogs').click(function(){
  var spinnerHeight = $('.spinner-module').height();
  if(eqDisplay){
  $('.spinner-module').css('display', 'block');
  $('.eq').css('display', 'none');
  eqDisplay = false;
}else{
  $('.spinner-module').css('display', 'none');
  $('.eq').css('display', 'flex').height(spinnerHeight);
  eqDisplay = true;
  }
});
//////----END OF EQUALIZER WINDOW----//////


//////----EQ----//////
var gainDb = -40.0;
var bandSplit = [360,3600];

context = new AudioContext();
source = context.createMediaElementSource(document.getElementsByTagName('audio')[0]);

var hBand = context.createBiquadFilter();
hBand.type = "lowshelf";
hBand.frequency.value = bandSplit[0];
hBand.gain.value = gainDb;

var hInvert = context.createGain();
hInvert.gain.value = -1.0;

var mBand = context.createGain();

var lBand = context.createBiquadFilter();
lBand.type = "highshelf";
lBand.frequency.value = bandSplit[1];
lBand.gain.value = gainDb;

var lInvert = context.createGain();
lInvert.gain.value = -1.0;

source.connect(lBand);
source.connect(mBand);
source.connect(hBand);

hBand.connect(hInvert);
lBand.connect(lInvert);

hInvert.connect(mBand);
lInvert.connect(mBand);

var lGain = context.createGain();
var mGain = context.createGain();
var hGain = context.createGain();

lBand.connect(lGain);
mBand.connect(mGain);
hBand.connect(hGain);

var sum = context.createGain();
lGain.connect(sum);
mGain.connect(sum);
hGain.connect(sum);
sum.connect(context.destination);
//////----END OF EQ----//////
//////----CONTROLS----//////

$('#volume').on("input change", function() {
  audio.volume = ($(this).val()/100);
});
$('#eqLow').on("input change", function() {
  lGain.gain.value = ($(this).val()/100);
});
$('#eqMid').on("input change", function() {
  mGain.gain.value = ($(this).val()/100);
});
$('#eqHigh').on("input change", function() {
  hGain.gain.value = ($(this).val()/100);
});
//////----END OF CONTROLS----//////

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
var status = true;
var status2 = true;
  var statusId = function () {
    if(navigator.onLine){
      status = true;
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