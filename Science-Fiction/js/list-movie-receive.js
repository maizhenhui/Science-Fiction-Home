document.write("<script src='js/function.js'></script>");

$(document).ready(function(){  
  AOS.init({
    easing: 'ease-out-back',
    duration:'700'
  });

  var page = getUrlParam("page");
  var num_page = parseInt(page);

  $.get("mysql/list_data.php",{type:'movie',page:page,max_data_num:3},function(result){
    var jsonObj =  JSON.parse(result);
    var jsonArr = [];
    for(var i =0 ;i < jsonObj.length;i++){
      jsonArr[i] = jsonObj[i];
      var arr_imgid = jsonArr[i].img_id.split(',');

      var jsonStr = JSON.stringify(jsonArr[i].content);
      var jsonArrB = jsonStr.split("\\r\\n");
      // //去除多余的双引号
      jsonArrB[0] = jsonArrB[0].replace(/"/,"");
      jsonArrB[jsonArrB.length-1] = jsonArrB[jsonArrB.length-1].slice(0,jsonArrB[jsonArrB.length-1].length-1);    
      var p = 0;
      //添加标签
      for(var j = 0;j<jsonArrB.length;j++){
        if(jsonArrB[j]){
          if(jsonArrB[j] != "[img]")
          {
            if(p<2)
            {
              jsonArrB[j] = "<p style='margin:7px 0px'>" + jsonArrB[j] + "</p>";
              p++
            }
            else{
              jsonArrB[j] = "";
            }
          }
          else if(jsonArrB[j] == "[img]")
          {
            jsonArrB[j] = "";
          }
        }
        else{
          jsonArrB[i] = "";
        }
      }
      arr_result = jsonArrB.join("");//并列字符串

      $(".list-content ul").append("<li><div class='list-list'><a href='./culture-page.html?type=movie&id=" + jsonArr[i].id + 
      "'><img style='width:220px;height:320px;float:left;border-radius:5px;margin:15px;margin-left:30px;' src='upload-img/movie_img/" + arr_imgid[0] +
        ".jpg'><div class='wrap-detail-info' style='float:left;margin-left:20px;width:482px;'><span class='movie-title'>"+jsonArr[i].title+
        "</span><div class='movie-content'>"+ arr_result +"</div>"
       + "<div class='detail' style='float:right;'>详细</div></a></div></div></li>");     
      $('.list-content ul li').css({
        "height":'350px',
        "width":'800px',
        "margin-bottom":"20px",
        "background":"rgba(4,30,48,.7)",
        "border-radius":"5px",
        "box-shadow":"4px 4px 5px black"
      });   
      $('.list-content ul').css({
        "list-style":'none',
        "display":"inline-block"
      });    
      $('.movie-title').css({
        "font-size":'30px',
        "font-weight":'600',
        "color":"#fff"
      });     
      $('.movie-content').css({
        "font-size":'17px',
        "margin-top":"20px",
        "height":"215px",
        "word-break":"break-word",
        "color":"#fff",
        "line-height":"22px",
        "letter-spacing":"1px",
        "text-indent":"2em",
        "overflow":"hidden"
      });      
      $('.detail').css({
        "color":"#fff",
        "background":"#3560c5",
        "height":"35px",
        "width":"80px",
        "border-radius":"16px",
        "text-align":"center",
        "line-height":"35px"
      }); 
    }
    $('.list-list a').css({
      "text-decoration":"none"
    })
    $('.wrap-detail-info').css({
      "margin-top":"30px"
    })                       
  });  
  $.get("mysql/list_num.php",{type:'movie',page:num_page,max_data_num:3},function(result){
    div_page(num_page,result);
  });  
});

function div_page(num_page,max_page_num){
  //分页栏
  //(上一页、首页)
  if(num_page > 1)
  {
    $(".page-area").append("<a class='first-page' href='./list-movie.html?page=1'>首页</a>")
    $(".page-area").append("<a class='up-page' href='./list-movie.html?page="+(num_page-1)+"'>上一页</a>")
  }
  else{
    $(".page-area").append("<div class='first-page'>首页</div>")
    $(".page-area").append("<div class='up-page'>上一页</div>")
  }
  //(中间层)
  if(max_page_num > 5)
  {
    if(num_page > 3 && num_page < (max_page_num-1))
    {
      for(var j = -2;j<3;j++){
        if(j+num_page == num_page) {
          $(".page-area").append("<div class='ignore'>"+(j+num_page)+"</div>")
          continue;
        }          
        $(".page-area").append("<a href='./list-movie.html?page="+(j+num_page)+"'>"+(j+num_page)+"</a>")
      }    
    }
    else if(num_page <= 3){
      for(var j = 1;j<=5;j++){
        if(j == num_page) {
          $(".page-area").append("<div class='ignore'>"+j+"</div>")
          continue;
        }
        $(".page-area").append("<a href='./list-movie.html?page="+j+"'>"+j+"</a>")
      }          
    }
    else{
      for(var j = -4;j<1;j++){
        if(j+max_page_num == num_page) {
          $(".page-area").append("<div class='ignore'>"+(j+max_page_num)+"</div>")
          continue;
        }             
        $(".page-area").append("<a href='./list-movie.html?page="+(j+max_page_num)+"'>"+(j+max_page_num)+"</a>")
      }        
    } 
  }
  else{
    for(var j = 1;j<=max_page_num;j++){
      if(j == num_page) {
        $(".page-area").append("<div class='ignore'>"+j+"</div>")
        continue;
      }        
      $(".page-area").append("<a href='./list-movie.html?page="+j+"'>"+j+"</a>")
    }            
  }
  //(下一页、尾页)
  if(num_page < max_page_num)
  {
    $(".page-area").append("<a class='down-page' href='./list-movie.html?page="+(num_page+1)+"'>下一页</a>")
    $(".page-area").append("<a class='last-page' href='./list-movie.html?page="+max_page_num+"'>尾页</a>")
  }
  else{
    $(".page-area").append("<div class='down-page'>下一页</div>")
    $(".page-area").append("<div class='last-page'>尾页</div>")
  }  
  //跳页
  $(".jump-area").append("<span style='float:left;'>跳至</span>")
  $(".jump-area").append("<input id='input_num' maxlength='3' oninput=\"value=value.replace(/[^\\d]/g,'')\" style='float:left;border:1px solid #dacccc;outline:none;width:25px;margin:1px 15px;padding:2px 5px;text-align:center;'>")
  $(".jump-area").append("<span style='float:left;'>页</span>")
  $(".jump-area").append("<button id='jump_page' style='float:left;margin:0px 10px;margin-top:2px;cursor:pointer;width:45px;background:rgb(113, 100, 162);color:white;'>确认</button>")
  $(".jump-area").append("<span style='float:left;letter-spacing:5px;color:#a08f8f;font-weight:150'>共"+max_page_num+"页</span>")

  //选页区
  $('.page-area a').css({
    "width":"20px",
    "float":"left"
  });       
  $('.first-page').css({
    "width":"40px",
    "float":"left"
  });   
  $('.last-page').css({
    "width":"40px",
    "float":"left"
  });            
  $('.up-page').css({
    "width":"50px",
    "margin":"0px 3px",
    "float":"left"
  });       
  $('.down-page').css({
    "width":"50px",
    "margin":"0px 3px",
    "float":"left"
  });     
  $('.page-area a').css({
    "text-align":"center",
    "color":"#fff",
    "height":"20px",
    "line-height":"20px",
    "text-decoration":"none",
    "margin":"0px 2px",
    "float":"left"
  });   
  $('.page-area div').css({
    "text-align":"center",
    "height":"20px",
    "line-height":"20px",
    "color":"#a08f8f"
  });
  $('.ignore').css({
    "width":"20px",
    "background":"#7164a2",
    "color":"white",
    "float":"left",
    "margin":"0px 2px",
    "border-radius":"50%",
    "opacity":"1.0" 
  });  
  $('.wrap-list-page').css({
    "height":'70px',
    "width":'800px',
    "margin":"0px auto",
    "margin-bottom":"20px",
    "background":"rgba(4,30,48)",
    "border-radius":"5px",
    "box-shadow":"4px 4px 5px black"    
  })

  $('#jump_page').click(function(){
    if($('#input_num').val()){
      if($('#input_num').val() <= 0){
        window.location.href='./list-move.html?page=1';
      }
      else if($('#input_num').val() > max_page_num){
        window.location.href='./list-movie.html?page='+max_page_num;
      }        
      else{
        window.location.href='./list-movie.html?page='+$('#input_num').val();
      }
    }
  });     
}