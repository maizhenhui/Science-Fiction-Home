document.write("<div class='wrap-navi-bar'>")
document.write("<ul class='list-navi'>")
document.write("</ul>")
document.write("</div>")
var slide = 0;
var ani;
$(document).ready(function(){
  //左板块
  $(".list-navi").append("<li class='nav-bar p-left'><div class='menu-left'></div></li>");
  $(".menu-left").append("<a href='./function.html' class='raise'>主页</a>");
  if(localStorage.uid)
  {
    $(".menu-left").append("<a href='./list-page.html?type=news&page=1' class='raise'>聚焦</a>");
    $(".menu-left").append("<a href='./list-movie.html?page=1' class='raise'>电影</a>");
    $(".menu-left").append("<a href='./list-page.html?type=novel&page=1' class='raise'>小说</a>");
    $(".menu-left").append("<a href='./list-page.html?type=comic&page=1' class='raise'>动漫</a>");
    $(".menu-left").append("<a href='./list-page.html?type=note&page=1' class='raise'>想法</a>");    
  }

  //LOGO
  $(".list-navi").append("<li class='nav-bar p-middle'><img src='./img/logo.png' alt=''></li></div>");    
  //右板块
  $(".list-navi").append("<li class='nav-bar p-right'><ul class='wrap-navi-user'></ul></li>");
  if(localStorage.uid){  
    $(".wrap-navi-user").append("<li class='nav-user'><div class='menu-right-profile'><a href='./personal-edit.html" + "' "+ "class='nav-profile'>"
       + "<img src='./user-profile/"  + localStorage.pid + ".jpg'>" + "</a></div></li>");
    $(".wrap-navi-user").append("<li class='nav-user'><div class='menu-right'><i class='fa fa-picture-o fa-2x'><div class='dropdown-content'></div></i></div></li>");    
    //背景开始
    $(".dropdown-content").append("<div id='bg_default'>默认背景</div>");
    $("#bg_default").mousedown(function(){
      // $('body').css({
      //   'background':"url(./dynamic-background/default-background.jpg) fixed",
      //   'background-repeat': 'no-repeat',
      //   'background-size': 'cover'   
      // })
      $.get("mysql/background_change.php",{uid:localStorage.uid,background:-1},function(result){
        $("iframe").remove();
        localStorage.bg = -1;
      });        
    });
    $.getJSON("json/background.json", function (data){
      $.each(data, function (infoIndex, info){  
        $(".dropdown-content").append("<div id='bg_"+infoIndex+"'>"+info['name']+"</div>");
        $("#bg_"+infoIndex).mousedown(function(){
          if(localStorage.bg == -1)
            $('body').prepend("<iframe frameborder='0' scrolling=no style='position: fixed;width:100%;height:100%;'></iframe>")
          $("iframe").attr("src",info['url']);
          $.get("mysql/background_change.php",{uid:localStorage.uid,background:infoIndex},function(result){
            localStorage.bg = infoIndex;
          });
        });
      });
    });    
  }
  else{
    $(".wrap-navi-user").append("<li class='nav-user'><div class='menu-right'><a href='./login.html'><i class='fa fa-user-circle fa-2x'></i></a></div></li>");
  } 
  //背景结束
  if(window.location.pathname == '/myphp1/function.html'){
    $(".wrap-navi-user").append("<li class='nav-user'><div class='menu-right'><i class='fa fa-arrows-alt fa-2x'></i></div></li>");
    $("ul.list-navi").append("<div class='serach-area'><i class='fa fa-search fa-navi-search'></i><input class='input-style' placeholder='请输入关键字...'></div>");
  }
  else 
  {
    $(".wrap-navi-user").append("<li class='nav-user'><div class='menu-right'></div></li>");    
  }
  

  $("div.wrap-navi-bar").css({
    "height":"120px",
    "width":"1250px",
    "margin":"0px auto",
    "position":"relative",
    "z-index":'1'
  });  
  $("ul.list-navi").css({
    /*position: fixed;*/
    "list-style-type": "none",
    "width":"1250px",
    "z-index":"3",
    "height":"120px"
  });
  $("ul.wrap-navi-user").css({
    "list-style-type": "none",
    "float":"right"
  });  
  $("ul.list-navi li.p-left").css({
    "width": "40%"
  });
  $("ul.list-navi li.p-middle").css({
    "width": "20%",
    "text-align":"center"
  });    
  $("ul.list-navi li.p-right").css({
    "width": "40%"
  });      
  $("ul.list-navi li.nav-bar").css({
    "float":"left"
  });  
  $("ul.list-navi li.nav-user").css({
    "float":"left"
  });   
  $(".nav-bar img").css({
    "height": "80px",
    "width": "160px",
    "text-align": "center",
    "margin": "2px",
    "color": "white"
  });      
  $(".nav-bar li img").css({
    "width":"40px",
    "height":"40px",
    "border-radius":"50%"
  });  
  $(".menu-left").css({
    "margin-top": "25px",
    "height": "40px"
  }); 
  var click_con = 0;
  $(".menu-right i.fa-picture-o,.dropdown-content").click(function(){ 
    $(".dropdown-content").slideToggle("fast");
    if(slide){
      if(!click_con)
      {
        click_con = 1
        $('.wrap-navi-bar').removeClass('upmove')
      }
      else{
        click_con = 0
        $('.wrap-navi-bar').addClass('upmove')      
      }
    }
  }); 
  //全屏背景
  var animTimer;
  var hoving = 0;
  $(".menu-right .fa-arrows-alt").click(function(){
    if(!slide){
      $(".roundabout-area").slideUp(500,function(){
        $(".wrap-popularity-area").slideUp(500,function(){
          $(".speak-area").slideUp(500,function(){
            $(".div-area1,.div-area2,.div-area3").slideUp(500);
            $('.wrap-navi-bar').addClass('upmove')
            $(".dropdown-content").slideUp("fast");
            click_con = 0
            slide = 1;
            cTimer();
          });
        });
      });
    }
    else{
      $('.wrap-navi-bar').removeClass('upmove')
      $(".div-area1,.div-area2,.div-area3").slideDown(500,function(){
        $(".speak-area").slideDown(500,function(){
          $(".wrap-popularity-area").slideDown(500,function(){
            $(".roundabout-area").slideDown(500);
            slide = 0;
            clearTimeout(animTimer);
            animTimer=setTimeout('pageClick()');
          });
        });
      });
    }
  }); 

  $('.fa-search').click(function(){
    if($('.input-style').val()){
      var searchUrl = encodeURI(encodeURI("./search-page.html?page=1&content="+$('.input-style').val()));   //使用encodeURI编码
      window.location.href = searchUrl;
      //console.log($('.input-style').val())
    }
  });
});