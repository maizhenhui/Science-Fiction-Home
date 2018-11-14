document.write("<script src='js/function.js'></script>");

var max_data_num = 19;//defalut

$(document).ready(function(){
  AOS.init({
    easing: 'ease-out-back',
    duration:'700'
  });
  
  var type = getUrlParam("type");
  var page = getUrlParam("page");
  var num_page = parseInt(page);

  switch(type){
    case 'comic':$('.list-title p').html("科幻动漫");$('.page-logo').addClass("fa fa-space-shuttle fa-5");max_data_num=9;break;
    case 'movie':$('.list-title p').html("科幻电影");$('.page-logo').addClass("fa fa-film fa-5");max_data_num=3;break;
    case 'news':$('.list-title p').html("科幻聚焦");$('.page-logo').addClass("fa fa-newspaper-o fa-5");max_data_num=4;break;
    case 'novel':$('.list-title p').html("科幻小说");$('.page-logo').addClass("fa fa-book fa-5");max_data_num=8;break;
    case 'note':$('.list-title p').html("科幻想法");$('.page-logo').addClass("fa fa-lightbulb-o fa-5");max_data_num=5;break;
    default:break;
  };

  $.get("mysql/list_data.php",{type:type,page:page,max_data_num:max_data_num},function(result){
    var jsonObj =  JSON.parse(result);
    var jsonArr = [];
    for(var i =0 ;i < jsonObj.length;i++){
      jsonArr[i] = jsonObj[i];
      if(type == 'note'){
        $(".list-content ul").append("<li><a class='profile-href' href='./personal-space.html?uid="+
          jsonArr[i].uid+"'><img src='./user-profile/"+jsonArr[i].profile_id+".jpg' style='width:50px;height:50px;border-radius:50%;'></a>"+
          "<div class='wrap-right-area' style='float:left;margin-left:20px;padding:12px 9px;background:rgba(104,105,101,1.0);border-radius:5px;box-shadow:1px 1px 1px black;'>"+
          "<div style='width:630px;height:35px;'>" +
          "<div style='float:left;height:30px;line-height:30px;padding-left:10px;margin-bottom:10px;font-size:20px;font-weight:600;background:rgba(239,239,239,0.7);width:380px;border-radius:5px;'>"+jsonArr[i].title+"</div>" + 
          "<a href='./detail.html?id="+jsonArr[i].id+"' style='float:right' class='detail'>详细</a></div>" +
          "<div class='wrap-note-area' style='background:rgba(239,239,239,0.7);float:left;width:630px;height:90px;border-radius:5px;'>"+
          "<div style='margin-top:10px;margin-left:15px;width:610px;height:52px;'>"+jsonArr[i].content+"</div>"+
          "<div style='float:right;margin-right:10px;margin-top:5px;'>"+jsonArr[i].time+" 发布</div>" +
          "<div style='float:right;margin-right:5px;margin-top:5px;'>"+jsonArr[i].nickname+" 于</div>"
          +"</div></div></li>")
             
        $('.list-content ul li').css({
          "height":'180px' 
        });   
        $('.list-content ul').css({
          "list-style":'none',
          "padding":"0px 10px"
        }); 
        $('.list-title').css({
          "height":'30px'
        });  
        $('.list-list').css({
          "display":'inline-block'
        });            
        $('.list-content').css({
          "color":"black"
        });      
        $('.profile-href').css({
          "float":"left"
        });    
        $('.detail').css({
          "color":"#fff",
          "background":"#3560c5",
          "height":"30px",
          "width":"60px",
          "border-radius":"16px",
          "text-align":"center",
          "line-height":"30px",
          "text-decoration":'none'
        });           
      }
      else if(type == 'news'){
        var current_time = [];
        for(var j = 0;j<jsonArr[i].time.length-9;j++)
        {
          current_time.push(jsonArr[i].time[j])
        }
        current_time = current_time.join('');

        var arr_imgid = jsonArr[i].img_id.split(',');

        var jsonStr = JSON.stringify(jsonArr[i].content);
        var jsonArrB = jsonStr.split("\\r\\n");
        // //去除多余的双引号
        jsonArrB[0] = jsonArrB[0].replace(/"/,"");
        jsonArrB[jsonArrB.length-1] = jsonArrB[jsonArrB.length-1].slice(0,jsonArrB[jsonArrB.length-1].length-1);    
        //添加标签
        for(var j = 0;j<jsonArrB.length;j++){
          if(jsonArrB[j]){
            if(jsonArrB[j] != "[img]")
            {
              jsonArrB[j] = "<p>" + jsonArrB[j] + "</p>";
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

        $(".list-content ul").append("<li><div class='list-list'><a href='./news-page.html?id=" + jsonArr[i].id + 
        "'><img style='width:220px;height:130px;float:left' src='upload-img/news_img/" + arr_imgid[0] +
          ".jpg'><div class='wrap-detail-info' style='float:left;margin-left:20px;width:460px;'><span class='news-title'>"+jsonArr[i].title+
          "</span><div class='news-content'>"+ arr_result +"</div>"
         + "</a><div class='list-time' style='margin-top:10px;'>" + current_time + "</div></div></div>"
         + "<div class='line' style='width: 710px;height:1px;background-color: #e5e9ef;margin:15px auto;float:left;'></div></li>");     
        $('.list-content ul li').css({
          "height":'160px'
        });   
        $('.list-content ul').css({
          "list-style":'none',
          "padding":"0px 25px",
          "display":"inline-block"
        });  
        $('.list-title').css({
          "height":'30px'
        });   
        $('.list-content').css({
          "height":'640px'
        });     
        $('.news-title').css({
          "font-size":'20px'
        });     
        $('.news-content').css({
          "font-size":'16px',
          "margin-top":"20px",
          "height":"63px",
          "word-break":"break-word",
          "letter-spacing":"1px",
          "line-height":'20px',
          "overflow":"hidden",
          "text-indent":"2em"
        });                              
      }
      else if(type == 'comic'){
        var arr_imgid = jsonArr[i].img_id.split(',');

        $(".list-content ul").append("<li class='comic-style'><div class='wrap-grass'></div>"+
          "<div class='wrap-front'><a href='./culture-page.html?type="+ type +"&id=" + jsonArr[i].id + 
          "'><img style='width:220px;height:130px;border-top-left-radius: 4px;border-top-right-radius: 4px;' src='upload-img/comic_img/"+arr_imgid[0]+
          ".jpg'><div class='section-tion'>"+jsonArr[i].title+"</div></a></div></li>");

        $('.comic-style').css({
          "float":"left",
          "height":"220px",
          "padding":"0px 13px",
          "width":"220px"
        });     
        $('.list-content ul').css({
          "list-style":'none',
          "padding":"0px 5px",
          "display":"inline-block"
        }); 
        $('.list-title').css({
          "height":'30px'
        }); 
        $('.list-content').css({
          "height":'640px'
        });   
        $('.wrap-grass').css({
          "height":'165px',
          "width":"220px",
          "position":"absolute",
          "z-index":"1",
          "opacity":"1.0",
          "border-radius":"4px",
          "background":"#fff",
          // "filter": "blur(1px)",
          "box-shadow":"black 7px 7px 1px"
        });  
        $('.wrap-front').css({
          "position":'absolute',
          "z-index":"2"
        });
        $('.wrap-front a').css({
          "text-decoration":'none',
          "color":"black"
        });   
        $('.section-tion').css({
          "width":"220px",
          "height":"33px",
          "text-align":"center",
          "font-size":"16px",
          "line-height":"32px",
          "font-weight":"600"
          // "background":"#fff",
          // "opacity":"0.85"
        })                                                 
      } 
      else if(type == 'novel'){  
        var arr_imgid = jsonArr[i].img_id.split(',');

        $(".list-content ul").append("<li class='comic-style'>"+
          "<div class='wrap-front'><a href='./culture-page.html?type="+ type +"&id=" + jsonArr[i].id + 
          "'><img style='width:150px;height:210px;box-shadow:black 7px 7px 1px' src='upload-img/novel_img/"+arr_imgid[0]+
          ".jpg'><div class='section-tion'>"+jsonArr[i].title+"</div></a></div></li>");

        $('.comic-style').css({
          "float":"left",
          "height":"320px",
          "padding":"0px 17px",
          "width":"150px"
        });     
        $('.list-content ul').css({
          "list-style":'none',
          "padding":"0px 5px",
          "display":"inline-block"
        }); 
        $('.list-title').css({
          "height":'30px'
        }); 
        $('.list-content').css({
          "height":'640px'
        });   
        $('.wrap-front').css({
          "position":'absolute',
          "z-index":"2"
        });
        $('.wrap-front a').css({
          "text-decoration":'none',
          "color":"black",
          "display":"inline-block"
        });   
        $('.section-tion').css({
          "width":"156px",
          "height":"33px",
          "text-align":"center",
          "line-height":"32px",
          "font-weight":"600",
          "font-size":"15px",
          "background":"#fff",
          "margin-top":"10px",
          "text-shadow":"1px 1px 5px #696262"
        })                            
      }
    }
    $('.list-list a').css({
      "text-decoration":'none',
      "color":"#353535",
      "font-size":"16px",
      "font-weight":"600",
      "color":"#fff"
    });    
  });
  $('.fa-5').css({
    "font-size":"12em",
    "color":"rgb(224, 226, 228)",
    "opacity":"0.50",
    "text-align":"center",
    "width":"800px",
    "padding-top":"280px"
  });  
  $.get("mysql/list_num.php",{type:type,page:num_page,max_data_num:max_data_num},function(result){
    div_page(type,num_page,result);
  });
});

function div_page(type,num_page,max_page_num){
  //分页栏
  //(上一页、首页)
  if(num_page > 1)
  {
    $(".page-area").append("<a class='first-page' href='./list-page.html?type="+type+"&page=1'>首页</a>")
    $(".page-area").append("<a class='up-page' href='./list-page.html?type="+type+"&page="+(num_page-1)+"'>上一页</a>")
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
        $(".page-area").append("<a href='./list-page.html?type="+type+"&page="+(j+num_page)+"'>"+(j+num_page)+"</a>")
      }    
    }
    else if(num_page <= 3){
      for(var j = 1;j<=5;j++){
        if(j == num_page) {
          $(".page-area").append("<div class='ignore'>"+j+"</div>")
          continue;
        }
        $(".page-area").append("<a href='./list-page.html?type="+type+"&page="+j+"'>"+j+"</a>")
      }          
    }
    else{
      for(var j = -4;j<1;j++){
        if(j+max_page_num == num_page) {
          $(".page-area").append("<div class='ignore'>"+(j+max_page_num)+"</div>")
          continue;
        }             
        $(".page-area").append("<a href='./list-page.html?type="+type+"&page="+(j+max_page_num)+"'>"+(j+max_page_num)+"</a>")
      }        
    } 
  }
  else{
    for(var j = 1;j<=max_page_num;j++){
      if(j == num_page) {
        $(".page-area").append("<div class='ignore'>"+j+"</div>")
        continue;
      }        
      $(".page-area").append("<a href='./list-page.html?type="+type+"&page="+j+"'>"+j+"</a>")
    }            
  }
  //(下一页、尾页)
  if(num_page < max_page_num)
  {
    $(".page-area").append("<a class='down-page' href='./list-page.html?type="+type+"&page="+(num_page+1)+"'>下一页</a>")
    $(".page-area").append("<a class='last-page' href='./list-page.html?type="+type+"&page="+max_page_num+"'>尾页</a>")
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
    "opacity":"0.4" 
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

  $('#jump_page').click(function(){
    if($('#input_num').val()){
      if($('#input_num').val() <= 0){
        window.location.href='./list-page.html?type='+type+'&page=1';
      }
      else if($('#input_num').val() > max_page_num){
        window.location.href='./list-page.html?type='+type+'&page='+max_page_num;
      }        
      else{
        window.location.href='./list-page.html?type='+type+'&page='+$('#input_num').val();
      }
    }
  });     
}