$(document).ready(function () {

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
var $document = $(document);
  $('audio').data('bpm', '1');
  $('.spinner-wrap').click(function () {
    
    var $this = $(this),
      audio = $this.siblings('audio')[0],
      bpm = $this.siblings('audio').data('bpm');
      audio.volume = 0;
    if (audio.paused) {
      
      // audio.load();
      // audio.play();
      // $('audio').animate({volume: 1}, 5000);
      // spinWidth = $('#spinner').width();
      // $('#spinner').css({'background':'url("img/plast_logo.png") center center no-repeat','background-size': spinWidth + 'px ' + spinWidth + 'px','animation': 'spin-cw 20s linear infinite', 'transition':'all 1500ms'});
      

      audio.load();
      audio.play();
      
      
      $('audio').animate({volume: 1}, 1000);
        spinWidth = $('#spinner').width();
      $('#spinner').css({'background':'url("img/plast_logo.png") center center no-repeat','background-size': spinWidth + 'px ' + spinWidth + 'px','animation': 'spin-cw 20s linear infinite', 'transition':'all 1500ms'});
    
      
    
    } else {

      
      $('#spinner').css({'background':'url("img/plast_paused.png") center center no-repeat','background-size': spinWidth + 'px ' + spinWidth + 'px','animation-play-state': 'paused', 'transition':'all 1500ms'});
      // $('audio').animate({volume: 0}, 5000);
      $('audio').animate({volume: 0}, 1000).each(function(){
        audio.pause();
      });
      
    
    }
  });
});


