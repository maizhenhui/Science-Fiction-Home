$(document).ready(function(){
  AOS.init({
    easing: 'ease-out-back',
    duration:'700'
  });
  
  if(!localStorage.uid)
  {
    window.location.href = 'index.html';
    return;
  }

  $.get("mysql/function_popularity.php",function(data){
    var jsonObj =  JSON.parse(data)
    var jsonStr1 = JSON.stringify(jsonObj)
    var jsonArr = [];
    for(var i =0 ;i < jsonObj.length;i++){
        jsonArr[i] = jsonObj[i];
        if(jsonArr[i].type == 'movie')
        {
          $("#m_"+(jsonArr[i].rank-1)+" a").text(jsonArr[i].title);
          $("#m_"+(jsonArr[i].rank-1)+" a").attr("href","./culture-page.html?id="+jsonArr[i].page_id+"&type=movie");
        }
        else if(jsonArr[i].type == 'novel')
        {
          $("#n_"+(jsonArr[i].rank-11)+" a").text(jsonArr[i].title);
          $("#n_"+(jsonArr[i].rank-11)+" a").attr("href","./culture-page.html?id="+jsonArr[i].page_id+"&type=novel");
        }
        else if(jsonArr[i].type == 'comic')
        {
          $("#c_"+(jsonArr[i].rank-21)+" a").text(jsonArr[i].title);
          $("#c_"+(jsonArr[i].rank-21)+" a").attr("href","./culture-page.html?id="+jsonArr[i].page_id+"&type=comic");
        }        
    }
  });  
      
  $.get("mysql/note_data.php",function(data,status){ 
    var jsonObj =  JSON.parse(data)
    var jsonArr = [];
    for(var i =0 ;i < jsonObj.length;i++){
        jsonArr[i] = jsonObj[i];
        if(jsonArr[i].author)
        {
          $("ul.list-show").append("<li id='insert-thing'><div class='note-title fl-left'>"
          +"<a href='./detail.html?id=" + jsonArr[i].id + "'>"
          + jsonArr[i].title + "</a>" + "</div><div class='note-author fl-left'>" 
          + jsonArr[i].author + "</div><div class='note-time fl-left'>" + jsonArr[i].time + "</div></li>")
        }
        else{
          $("ul.list-show").append("<li id='insert-thing'><div class='note-title fl-left'>"
          +"<a href='./detail.html?id=" + jsonArr[i].id + "'>"
          + jsonArr[i].title + "</a>" + "</div><div class='note-author fl-left'>" 
          + "#" + jsonArr[i].uid + "</div><div class='note-time fl-left'>" + jsonArr[i].time + "</div></li>")         
        }
    }
  });

  $("button").click(function(){
    $("ul.list-show").slideUp(function(){
      $.get("mysql/note_data.php",function(data,status){ 
        $("li").remove("#insert-thing");
        var jsonObj =  JSON.parse(data)
        var jsonArr = [];
        for(var i =0 ;i < jsonObj.length;i++){
            jsonArr[i] = jsonObj[i];
            if(jsonArr[i].author)
            {
              $("ul.list-show").append("<li id='insert-thing'><div class='note-title fl-left'>"
              +"<a href='./detail.html?id=" + jsonArr[i].id + "'>"
              + jsonArr[i].title + "</a>" + "</div><div class='note-author fl-left'>" 
              + jsonArr[i].author + "</div><div class='note-time fl-left'>" + jsonArr[i].time + "</div></li>")
            }
            else{
              $("ul.list-show").append("<li id='insert-thing'><div class='note-title fl-left'>"
              +"<a href='./detail.html?id=" + jsonArr[i].id + "'>"
              + jsonArr[i].title + "</a>" + "</div><div class='note-author fl-left'>" 
              + "#" + jsonArr[i].uid + "</div><div class='note-time fl-left'>" + jsonArr[i].time + "</div></li>")         
            }
        }
        $("ul.list-show").slideDown();
      });
    });
  });

  //动画卷入去 电影
  $.get("mysql/list_data.php",{type:'movie',page:1,max_data_num:5},function(result){
    var jsonObj =  JSON.parse(result);
    var jsonArr = [];
    for(var i =0 ;i < jsonObj.length;i++){
      jsonArr[i] = jsonObj[i];
      var arr_imgid = jsonArr[i].img_id.split(',');

      $(".wrap-movie-content ul").append("<li style='float:left;color:#fff;margin:0px 15px;'>"+
        "<a href='./culture-page.html?type=movie&id="+jsonArr[i].id+"'><img style='height:270px;width:175px;border-radius:4px;' src='upload-img/movie_img/"+arr_imgid[0]+".jpg'></a></li>");
    }
  });

  $(".wrap-movie-area").hover(
    function(){
        var div=$(".wrap-movie-content");
        div.stop();
        div.animate({width:'1100px'},300);
        var div1=$(".wrap-movie-int");
        div1.stop();
        div1.animate({opacity:'0.0'},300);   
    },
    function(){
        var div=$(".wrap-movie-content");
        div.stop();
        div.animate({width:'0px'},300);
        var div1=$(".wrap-movie-int");
        div1.stop();
        div1.animate({opacity:'1.0'},300);       
    }    
  )

  //动画卷入去 动漫
  $.get("mysql/list_data.php",{type:'comic',page:1,max_data_num:3},function(result){
    var jsonObj =  JSON.parse(result);
    var jsonArr = [];
    for(var i =0 ;i < jsonObj.length;i++){
      jsonArr[i] = jsonObj[i];
      var arr_imgid = jsonArr[i].img_id.split(',');

      $(".wrap-comic-content ul").append("<li style='float:left;color:#fff;margin:0px 15px;'>"+
        "<a href='./culture-page.html?type=comic&id="+jsonArr[i].id+"'><img style='height:200px;width:310px;border-radius:4px;' src='upload-img/comic_img/"+arr_imgid[0]+".jpg'></a></li>");
    }
  });

  $(".wrap-comic-area").hover(
    function(){
        var div=$(".wrap-comic-content");
        div.stop();
        div.animate({width:'1100px'},300);
        var div1=$(".wrap-comic-int");
        div1.stop();
        div1.animate({opacity:'0.0'},300);          
    },
    function(){
        var div=$(".wrap-comic-content");
        div.stop();
        div.animate({width:'0px'},300);
        var div1=$(".wrap-comic-int");
        div1.stop();
        div1.animate({opacity:'1.0'},300);          
    }    
  )  

  //动画卷入去 小说
  $.get("mysql/list_data.php",{type:'novel',page:1,max_data_num:3},function(result){
    var jsonObj =  JSON.parse(result);
    var jsonArr = [];
    for(var i =0 ;i < jsonObj.length;i++){
      jsonArr[i] = jsonObj[i];
      var arr_imgid = jsonArr[i].img_id.split(',');

      $(".wrap-novel-content ul").append("<li style='float:left;color:#fff;margin:0px 15px;'>"+
        "<a href='./culture-page.html?type=novel&id="+jsonArr[i].id+"'><img style='height:250px;width:180px;' src='upload-img/novel_img/"+arr_imgid[0]+".jpg'></a></li>");
    }
  });

  $(".wrap-novel-area").hover(
    function(){
        var div=$(".wrap-novel-content");
        div.stop();
        div.animate({width:'700px'},300);
        var div1=$(".wrap-float");
        div1.stop();
        div1.animate({width:'370px'},300);    
        var div1=$(".wrap-novel-int");
        div1.stop();
        div1.animate({opacity:'0.0'},300);               
    },
    function(){
        var div=$(".wrap-novel-content");
        div.stop();
        div.animate({width:'0px'},300);
        var div1=$(".wrap-float");
        div1.stop();
        div1.animate({width:'0px'},300);   
        var div1=$(".wrap-novel-int");
        div1.stop();
        div1.animate({opacity:'1.0'},300);                    
    }    
  )    
  $(".wrap-appear div,.wrap-float").hover(
    function(){
        var div1=$(".wrap-float");
        div1.stop();
        div1.animate({width:'370px'},300);        
    },
    function(){
        var div1=$(".wrap-float");
        div1.stop();
        div1.animate({width:'0px'},300);           
    }    
  )    
});

