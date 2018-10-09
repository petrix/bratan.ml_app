$(document).ready(function(){


var intId;
// var z = 0;
// var w = $( window ).width();
var w = $('.songmodule').width();
    var ww = w;
    var www = w;
  var intervalId = function(){
    // z++;
var x = $('#x').html();
// var y = x.length;
var yLength = ww + x.length * (parseFloat($("#x").css("font-size"))) / 1.8;
  $.getJSON('http://radiobratan.tk:88/api/nowplaying', function(data){
    // console.log(data[0].now_playing);
    $('#x').html(data[0].now_playing.song.text);
    $('.songstatus').css('width',(data[0].now_playing.elapsed/data[0].now_playing.duration)*100+'%');
  });
    ww=ww-2;
    www=www-2;
if(yLength > 0){
// console.log(yLength);
  $('#x').css('transform', 'translateX('   + www  + 'px)');
  } else {
    z = 0;
    www = w;
    ww = w;
  }
  }

  clearInterval(intId);
  intId = setInterval(intervalId, 30);

});