$(document).ready(function () {
  $('audio').data('bpm', '1');
  $('.spinner-wrap').click(function () {

    var $this = $(this),
      audio = $this.siblings('audio')[0],
      bpm = $this.siblings('audio').data('bpm');
    if (audio.paused) {
      console.log(audio);
      audio.load();
      audio.play();
      spinWidth = $('#spinner').width();
      $('#spinner').css({'background':'url("img/plast_logo.png") center center no-repeat','background-size': spinWidth + 'px ' + spinWidth + 'px','animation': 'spin-cw 20s linear infinite'})
    } else {
      $('#spinner').css({'background':'url("img/plast_paused.png") center center no-repeat','background-size': spinWidth + 'px ' + spinWidth + 'px','animation-play-state': 'paused'})

      audio.pause();

    }
  });
});


