var title = [];

var animTimer2;
var last_click;
$(document).ready(function(){
  $('#myRoundabout').roundabout({
    shape:'figure8',minOpacity:0.5,maxOpacity:1.0
  });

  $('#myRoundabout li:first').children('a').attr('href',$('#myRoundabout li:first').children(':hidden').val());
  $('#myRoundabout').autoPlay();

  $.get("mysql/function_roundabout.php",function(data,status){ 
    var jsonObj =  JSON.parse(data)
    var jsonArr = [];
    for(var i = 0 ;i < jsonObj.length;i++){
        jsonArr[i] = jsonObj[i];
        $('#roundabout'+i+' a img').attr('src',"upload-img/roundabout_img/"+jsonArr[i].img_id+".jpg");
        title[i] = jsonArr[i].title;
        $('#roundabout'+i+' a').attr("href","./news-page.html?id="+jsonArr[i].news_id);
    }
    $('#roundabout-title').text(title[0]);
    if($('#roundabout-title').height() == 49)
      $('.hide-cover').css({'padding':'40px 0px'})
    else if($('#roundabout-title').height() == 98)
      $('.hide-cover').css({'padding':'15px 0px'})   
    last_click = 0;

    for(var i = 0;i<5;i++)
    {
      (function(i){
        setTimeout(function(){
          $('#roundabout'+i).click(function(){
            if(last_click != i)
            {
              last_click = i;
              clearTimeout(animTimer2);
              $('.hide-cover').css({
                "float":"right"
              })
              $('#roundabout-title').css({
                "float":"left"
              })            
              var div=$(".hide-cover");
              div.animate({width:'0px'},300);
              div.animate({width:'1100px'},300);
              animTimer2 = setTimeout(function(){
              $('#roundabout-title').text(title[i])
              if($('#roundabout-title').height() == 49)
                $('.hide-cover').css({'padding':'40px 0px'})
              else if($('#roundabout-title').height() == 98)
                $('.hide-cover').css({'padding':'15px 0px'})              
              $('.hide-cover').css({
                "float":"left"
              })
              $('#roundabout-title').css({
                "float":"right"
              })               
              },300);
            }
          }); 
        },10)
      })(i);
    }    
  });
});

$.fn.autoPlay=function(){
  if($(this).children('li').length==5){
    $(this).unbind('mousemove').unbind('mouseout').mousemove(cTimer).mouseout(createTimer);
    createTimer();
  }
}
var animTimer;var index=0;
function pageClick(){
  $('#roundabout'+index).click();
  index++;
  if(index>4){
    index=0;
  }
  createTimer();
}
function createTimer(){cTimer();animTimer=setTimeout('pageClick()',5000);}
function cTimer(){clearTimeout(animTimer);}
function ScrollImgTop(){
  var speed=15;
  var scroll_begin=document.getElementById("scroll_begin");
  var scroll_end=document.getElementById("scroll_end");
  var scroll_div=document.getElementById("scroll_div");
  scroll_end.innerHTML=scroll_begin.innerHTML
  function Marquee(){
    if(scroll_end.offsetTop-scroll_div.scrollTop<=0)
    scroll_div.scrollTop-=scroll_begin.offsetHeight
    else
    scroll_div.scrollTop++
  } 
  var MyMar=setInterval(Marquee,speed)
  scroll_div.onmouseover=function(){clearInterval(MyMar)}
  scroll_div.onmouseout=function(){MyMar=setInterval(Marquee,speed)}
}