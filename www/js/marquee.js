$(document).ready(function(){


var intId;
var z = 0;
var w = $( window ).width();
    var ww = w;
    var www = w;
  var intervalId = function(){

    z++;

var x = $('#x').html();
var y = x.length;
var yLength = ww + x.length * (parseFloat($("#x").css("font-size"))) / 1.8;
// console.log(parseFloat($("#x").css("font-size")));
// console.log(y);
// console.log(w);

    ww=ww-2;
    www=www-2;
if(yLength > 0){
console.log(yLength);
  $('#x').css('transform', 'translateX('   + www  + 'px)');
  } else {
    // console.log(www)
    // clearInterval(intId);
    z = 0;
    www = w;
    ww = w;
    // yLength = ww + x.length * 20;
    // intId = setInterval(intervalId, 50);
  }
  }
  
  clearInterval(intId);
  intId = setInterval(intervalId, 20);

});