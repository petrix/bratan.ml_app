$(document).ready(function(){
    var intId;
    var w = $('.songmodule').width();
    var ww = w+00;
    
var intervalId = function(){
  var x = $('.songtitle').html();
  var yLength = ww + x.length * (parseFloat($('.songtitle').css('font-size'))) / 1.7;
      
    
        if(yLength > 0){
          if(ww < w){
            $('.songtitle').css('color', '#fff');
            
          }
          $('.songtitle').css('transform', 'translateX('   + ww  + 'px)');
          $('.songtitle-back').css('transform', 'translate(' + ww  + 'px, -120px)');
          } else {
            $('.songtitle').css('color', 'transparent');
            $.getJSON('http://radiobratan.tk:88/api/nowplaying', function(data){
                    $('.songtitle').html(data[0].now_playing.song.text);
                    // $('.songtitle-back').html(data[0].now_playing.song.text);
                    
                  });
          ww = w+80;
        }
        ww-=80;

  }
  clearInterval(intId);
  intId = setInterval(intervalId, 1000);

});