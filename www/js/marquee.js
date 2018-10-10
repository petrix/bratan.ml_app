$(document).ready(function(){
    var intId;
    var w = $('.songmodule').width();
    var ww = w;
var intervalId = function(){
  
  
  var x = $('.songtitle').html();
  var yLength = ww + x.length * (parseFloat($('.songtitle').css('font-size'))) / 1.7;
      
    ww=ww-7;
        if(yLength > 0){
          $('.songtitle').css('transform', 'translateX('   + ww  + 'px)');
          } else {
            
            $('.songtitle').css('display', 'none');
            // setTimeout(200);
            $.getJSON('http://radiobratan.tk:88/api/nowplaying', function(data){
                    $('.songtitle').html(data[0].now_playing.song.text);
                  });
          ww = w;
          // $('.songtitle').css('transform', 'translateX('   + ww  + 'px)');
          $('.songtitle').css('display', 'block');
          // setTimeout(200);
  
        }
  }
  clearInterval(intId);
  intId = setInterval(intervalId, 100);

});