$(document).ready(function () {

  eqWindow = 0;
  qrWindow = 0;
  requestWindow = 0;

  // console.log(screen.orientation.type);
  // screen.lockOrientation(portrait-primary);
  //////----PRELOAD IMAGES----//////
  // function preload(arrayOfImages) {
  //   $(arrayOfImages).each(function(){
  //       $('<img/>')[0].src = this;
  //   });
  //  } 
  //   preload([
  //     'img/plast_logo.png',
  //     'img/plast_paused.png',
  //     'img/BG_2.jpg'
  // ]);
  //////----END OF PRELOAD IMAGES----//////
  var context;
  //////----AUDIO PLAYER----//////
  var playingMode = false;
  context = new AudioContext();

  var audio = context.createMediaElementSource($('.audio')[0]);
  var eqInput = context.createMediaStreamDestination(audio);
  console.log(audio);
  audio.crossOrigin = "anonymous";
  var spinnerHeight = $('#spinner').height();


  function pushPlay() {
    audio.volume = 0;
    $('.audio').trigger('load');
    $('.audio').trigger('play');
    // audio.load();
    // audio.play();
    spinnerHeight = $('#spinner').height();
    // console.log(0spinnerHeight);
    $('.spinner-outer').css({
      'animation': 'spin-cw 20s linear infinite'
    });
    $('.spinnerlogo').css({
      'background': 'url("img/plast_logo_center.png") center center no-repeat',
      'background-size': 'cover',
      'transition': 'all 1000ms'
    });
    volumeCtrl = ($('#volume').val() / 100);
    $(audio).animate({
      volume: volumeCtrl
    }, 700, function () {
      playingMode = true;
    });
  }

  function pushPause() {
    spinnerHeight = $('#spinner').height();
    $('.spinner-outer').css({
      'animation-play-state': 'paused'
    });
    $('.spinnerlogo').css({
      'background': 'url("img/plast_logo_center_black.png") center center no-repeat',
      'background-size': 'cover',
      'transition': 'all 1000ms'
    });

    $(audio).animate({
      volume: 0
    }, 300, function () {
      // audio.pause();
      $('.audio').trigger('pause');

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
  $(document).bind('keydown', 'space', function () {
    if (!playingMode) {
      pushPlay();
    } else {
      pushPause();
    }
  });
  $(document).bind('keydown', '0', function () {
    if (!playingMode) {
      pushPlay();
    } else {
      pushPause();
    }
  });
  $(document).bind('keydown', 'up', function () {
    volumeCtrl = parseInt($('#volume').val());
    if (volumeCtrl <= 95) {
      volumeCtrl += 5;
      $('#volume').val(volumeCtrl);
      audio.volume = ($('#volume').val() / 100);
      $('.status').html('volume: ' + volumeCtrl + '%');
    }
  });
  $(document).bind('keydown', 'down', function () {
    volumeCtrl = parseInt($('#volume').val());
    if (volumeCtrl >= 5) {
      volumeCtrl -= 5;
      $('#volume').val(volumeCtrl);
      audio.volume = ($('#volume').val() / 100);
      $('.status').html('volume: ' + volumeCtrl + '%');
    }
  });
  $(document).bind('keydown', '1', function () {
    spinnerHeight = $('.player').height() - 2;
    // console.log(spinnerHeight);
    if (eqWindow == 0) {
      $('div.player > :nth-child(1)').css('display', 'none');
      $('div.player > :nth-child(2)').css('display', 'flex').height(spinnerHeight);
      $('div.player > :nth-child(3)').css('display', 'none');
      $('div.player > :nth-child(4)').css('display', 'none');
      eqWindow = 1;
      qrWindow = 0;
      requestWindow = 0;
    } else if (eqWindow == 1) {
      $('div.player > :nth-child(1)').css('display', 'block');
      $('div.player > :nth-child(2)').css('display', 'none');
      $('div.player > :nth-child(3)').css('display', 'none');
      $('div.player > :nth-child(4)').css('display', 'none');
      eqWindow = 0;
      qrWindow = 0;
      requestWindow = 0;
    }
  });
  $(document).bind('keydown', 'q', function () {
    eqLow = parseInt($('#eqLow').val());
    if (eqLow <= 95) {
      eqLow += 5;
      $('#eqLow').val(eqLow);
      lGain.gain.value = ($('#eqLow').val() / 100);
      $('.status').html('low gain: ' + eqLow + '%');
    }
  });
  $(document).bind('keydown', 'a', function () {
    eqLow = parseInt($('#eqLow').val());
    if (eqLow >= 5) {
      eqLow -= 5;
      $('#eqLow').val(eqLow);
      lGain.gain.value = ($('#eqLow').val() / 100);
      $('.status').html('low gain: ' + eqLow + '%');
    }
  });
  $(document).bind('keydown', 'w', function () {
    eqMid = parseInt($('#eqMid').val());
    if (eqMid <= 95) {
      eqMid += 5;
      $('#eqMid').val(eqMid);
      mGain.gain.value = ($('#eqMid').val() / 100);
      $('.status').html('mid gain: ' + eqMid + '%');
    }
  });
  $(document).bind('keydown', 's', function () {
    eqMid = parseInt($('#eqMid').val());
    if (eqMid >= 5) {
      eqMid -= 5;
      $('#eqMid').val(eqMid);
      mGain.gain.value = ($('#eqMid').val() / 100);
      $('.status').html('mid gain: ' + eqMid + '%');
    }
  });
  $(document).bind('keydown', 'e', function () {
    eqHigh = parseInt($('#eqHigh').val());
    if (eqHigh <= 95) {
      eqHigh += 5;
      $('#eqHigh').val(eqHigh);
      hGain.gain.value = ($('#eqHigh').val() / 100);
      $('.status').html('high gain: ' + eqHigh + '%');
    }
  });
  $(document).bind('keydown', 'd', function () {
    eqHigh = parseInt($('#eqHigh').val());
    if (eqHigh >= 5) {
      eqHigh -= 5;
      $('#eqHigh').val(eqHigh);
      hGain.gain.value = ($('#eqHigh').val() / 100);
      $('.status').html('high gain: ' + eqHigh + '%');
    }
  });
  $(document).bind('keydown', '7', function () {
    eqLow = parseInt($('#eqLow').val());
    if (eqLow <= 95) {
      eqLow += 5;
      $('#eqLow').val(eqLow);
      lGain.gain.value = ($('#eqLow').val() / 100);
      $('.status').html('low gain: ' + eqLow + '%');
    }
  });
  $(document).bind('keydown', '4', function () {
    eqLow = parseInt($('#eqLow').val());
    if (eqLow >= 5) {
      eqLow -= 5;
      $('#eqLow').val(eqLow);
      lGain.gain.value = ($('#eqLow').val() / 100);
      $('.status').html('low gain: ' + eqLow + '%');
    }
  });
  $(document).bind('keydown', '8', function () {
    eqMid = parseInt($('#eqMid').val());
    if (eqMid <= 95) {
      eqMid += 5;
      $('#eqMid').val(eqMid);
      mGain.gain.value = ($('#eqMid').val() / 100);
      $('.status').html('mid gain: ' + eqMid + '%');
    }
  });
  $(document).bind('keydown', '5', function () {
    eqMid = parseInt($('#eqMid').val());
    if (eqMid >= 5) {
      eqMid -= 5;
      $('#eqMid').val(eqMid);
      mGain.gain.value = ($('#eqMid').val() / 100);
      $('.status').html('mid gain: ' + eqMid + '%');
    }
  });
  $(document).bind('keydown', '9', function () {
    eqHigh = parseInt($('#eqHigh').val());
    if (eqHigh <= 95) {
      eqHigh += 5;
      $('#eqHigh').val(eqHigh);
      // lGain.gain.value = ($(this).val()/100);
      hGain.gain.value = ($('#eqHigh').val() / 100);
      $('.status').html('high gain: ' + eqHigh + '%');
    }
  });
  $(document).bind('keydown', '6', function () {
    eqHigh = parseInt($('#eqHigh').val());
    if (eqHigh >= 5) {
      eqHigh -= 5;
      $('#eqHigh').val(eqHigh);
      hGain.gain.value = ($('#eqHigh').val() / 100);
      $('.status').html('high gain: ' + eqHigh + '%');
    }
  });
  //////----EQUALIZER WINDOW----//////
  $('.fa-cogs').click(function () {
    spinnerHeight = $('.player').height() - 2;
    if (eqWindow == 0) {
      $('div.player > :nth-child(1)').css('display', 'none');
      $('div.player > :nth-child(2)').css('display', 'flex').height(spinnerHeight);
      $('div.player > :nth-child(3)').css('display', 'none');
      $('div.player > :nth-child(4)').css('display', 'none');

      eqWindow = 1;
      qrWindow = 0;
      requestWindow = 0;
    } else if (eqWindow == 1) {
      $('div.player > :nth-child(1)').css('display', 'block');
      $('div.player > :nth-child(2)').css('display', 'none');
      $('div.player > :nth-child(3)').css('display', 'none');
      $('div.player > :nth-child(4)').css('display', 'none');

      eqWindow = 0;
    }
  });
  $('.qr-click').click(function () {
    spinnerHeight = $('.player').height() - 2;
    if (qrWindow == 0) {
      $('div.player > :nth-child(1)').css('display', 'none');
      $('div.player > :nth-child(2)').css('display', 'none');
      $('div.player > :nth-child(3)').css('display', 'flex').height(spinnerHeight).attr({
        'href': 'https://play.google.com/store/apps/details?id=com.p3xx.bratan',
        'target': '_blank'
      });
      $('div.player > :nth-child(4)').css('display', 'none');
      qrWindow = 1;
      eqWindow = 0;
      requestWindow = 0;
    } else if (qrWindow == 1) {
      $('div.player > :nth-child(1)').css('display', 'block');
      $('div.player > :nth-child(2)').css('display', 'none');
      $('div.player > :nth-child(3)').css('display', 'none');
      $('div.player > :nth-child(4)').css('display', 'none');
      qrWindow = 0;
    }
  });

  $('.status').click(function () {
    spinnerHeight = $('.player').height() - 2;
    if (requestWindow == 0) {
      $('div.player > :nth-child(1)').css('display', 'none');
      $('div.player > :nth-child(2)').css('display', 'none');
      $('div.player > :nth-child(3)').css('display', 'none');
      $('div.player > :nth-child(4)').css('display', 'block');
      qrWindow = 0;
      eqWindow = 0;
      requestWindow = 1;
    } else if (requestWindow == 1) {
      $('div.player > :nth-child(1)').css('display', 'block');
      $('div.player > :nth-child(2)').css('display', 'none');
      $('div.player > :nth-child(3)').css('display', 'none');
      $('div.player > :nth-child(4)').css('display', 'none');
      requestWindow = 0;
    }
  });
  //////----END OF EQUALIZER WINDOW----//////
  function equalization() {
    //////----EQ----//////
    var gainDb = -50.0;
    var bandSplit = [360, 3600];
    // var context = new AudioContext();
    // var audio = $('audio')[0];
    // var source = context.createMediaElementSource($('audio')[0]);
    console.log('source - ' + eqInput);
    //source = context.createMediaElementSource(document.getElementsByTagName('audio')[0]);
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
    eqInput.connect(lBand);
    eqInput.connect(mBand);
    eqInput.connect(hBand);
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
  }
  equalization();
  //////----END OF EQ----//////
  //////----CONTROLS----//////
  $('#volume').on("input change", function () {
    // audio.volume = ($(this).val()/100);
    sum.gain.value = ($(this).val() / 100);
  });
  $('#eqLow').on("input change", function () {
    lGain.gain.value = ($(this).val() / 100);
  });
  $('#eqMid').on("input change", function () {
    mGain.gain.value = ($(this).val() / 100);
  });
  $('#eqHigh').on("input change", function () {
    hGain.gain.value = ($(this).val() / 100);
  });
  //////----END OF CONTROLS----//////

  //////----MARQUEE----//////
  var intId;
  var moduleWidth, titleWidth;
  const step = 120;
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


    if ((slideLeft + $('.songtitle').width() + step > 0)) {
      if (slideLeft < $('.songmodule').width()) {
        $('.songtitle').addClass('opacity');
      }
      $('.songtitle').css('transform', 'translateX(' + slideLeft + 'px)');
    } else {
      $('.songtitle').removeClass('opacity');
      //////----CHECK INTERNET CONNECTION----//////
      if (navigator.onLine) {
        $.getJSON('http://radiobratan.tk:88/api/nowplaying', function (data) {
          $('.songtitle').html(data[0].now_playing.song.text);
          if (playingMode) {
            playerHeight = $('#spinner').height();
            $('.spinnerlogo').css({
              'background': 'url("' + data[0].now_playing.song.art + '") center center no-repeat',
              'background-size': 'cover',
              'transition': 'all 1000ms'
            });
            // $('.spinnerlogo').css({'background':'url("img/plast_logo_center.png") center center no-repeat'});

          }
          slideLeft = $('.songmodule').width();
        });
      } else {
        $('.songtitle').html('the INTERNET connection is totally fucked up!');
        slideLeft = $('.songmodule').width() + step + step;
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
  var inetCheck = 0;
  var restartPlayer = 0;
  var statusId = function () {
    if (navigator.onLine) {
      // pushPlay();
      $('.status').html('online');
      $.getJSON('http://radiobratan.tk:88/api/nowplaying', function (data) {
        $('.songstatus').css('width', (data[0].now_playing.elapsed / data[0].now_playing.duration) * 100 + '%');
        // console.log(data[0].now_playing.song.art);
      });
    } else {
      // pushPause();
      $('.songstatus').css('width', 100 + '%');
      $('.status').html('offline');
    }
  }
  clearInterval(statId);
  statId = setInterval(statusId, 3000);
  //////----END OF STATUS----//////

  // if(screen.orientation.type == )
});