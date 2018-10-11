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
      $this.addClass('playing');
    } else {
      audio.pause();
      $this.removeClass('playing');
    }
  });
});