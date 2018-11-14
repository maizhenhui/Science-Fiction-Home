document.write("<script src='js/function.js'></script>");

var max_data_num = 17;

$(document).ready(function(){
  AOS.init({
    easing: 'ease-out-back',
    duration:'700'
  });

  var page = getUrlParam("page");

  searchText = decodeURI(getUrlParam("content"));
  var num_page = parseInt(page);
  
  $(".input-style").val(searchText);

  $.get("mysql/search_data.php",{page:page,content:searchText,max_data_num:max_data_num},function(result){
    var jsonObj =  JSON.parse(result);
    var jsonArr = [];
    var max_page_num = 0;
    var str_type = [];
    for(var i =0 ;i < jsonObj.length;i++){
      jsonArr[i] = jsonObj[i];  
      if(jsonArr[i].type == 'news')
      {
        str_type = "新闻";
        $(".search-content ul").append("<li><div class='search-list'><a href='./news-page.html?id=" + jsonArr[i].id + 
        "'>"+ jsonArr[i].title +"</a>"+"<div class='list-time' style='float:right'>" + str_type + "</div></div>"+
        "<div class='line' style='width: 710px;height:1px;background-color: #e5e9ef;margin:5px auto;float:left;'></div></li>");      
      }
      else if(jsonArr[i].type == 'note')
      {
        str_type = "想法"
        $(".search-content ul").append("<li><div class='search-list'><a href='./detail.html?id=" + jsonArr[i].id + 
        "'>"+ jsonArr[i].title +"</a>"+"<div class='list-time' style='float:right'>" + str_type + "</div></div>"+
        "<div class='line' style='width: 710px;height:1px;background-color: #e5e9ef;margin:5px auto;float:left;'></div></li>");      
      }      
      else{
        switch(jsonArr[i].type){
          case 'comic':str_type = "动漫";break;
          case 'movie':str_type = "电影";break;
          case 'novel':str_type = "小说";break;
        }
        $(".search-content ul").append("<li><div class='search-list'><a href='./culture-page.html?type="+ jsonArr[i].type +"&id=" + jsonArr[i].id + 
        "'>"+ jsonArr[i].title +"</a>"+"<div class='list-time' style='float:right'>" + str_type + "</div></div>"+
        "<div class='line' style='width: 710px;height:1px;background-color: #e5e9ef;margin:5px auto;float:left;'></div></li>");          
      }
    }
    $('.search-list a').css({
      "text-decoration":'none',
      "color":"#353535",
      "font-size":"16px",
      "font-weight":"600",
      "color":"#fff"
    });  
    $('.search-content ul li').css({
      "height":'35px'
    });       
  });
  $.get("mysql/search_num.php",{content:searchText,max_data_num:max_data_num},function(result){
    div_page(searchText,num_page,result); 
    console.log(result);
  });      
  $('.search-content ul').css({
    "list-style":'none',
    "padding":"0px 25px"
  });
  $('.fa-5').css({
    "font-size":"12em",
    "color":"rgb(224, 226, 228)",
    "opacity":"0.50",
    "text-align":"center",
    "width":"800px",
    "padding-top":"280px"
  });    

});

function div_page(content,num_page,max_page_num){
  //分页栏
  //(上一页、首页)
  if(num_page > 1)
  {
    var searchUrl = encodeURI(encodeURI("./search-page.html?page=1&content="+content));
    $(".page-area").append("<a class='first-page' href='"+searchUrl+"'>首页</a>")
    var searchUrl = encodeURI(encodeURI("./search-page.html?content="+content+"&page="+(num_page-1)));
    $(".page-area").append("<a class='up-page' href='"+searchUrl+"'>上一页</a>")
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
        var searchUrl = encodeURI(encodeURI("./search-page.html?content="+content+"&page="+(j+num_page)));
        $(".page-area").append("<a href='"+searchUrl+"'>"+(j+num_page)+"</a>")
      }    
    }
    else if(num_page <= 3){
      for(var j = 1;j<=5;j++){
        if(j == num_page) {
          $(".page-area").append("<div class='ignore'>"+j+"</div>")
          continue;
        }
        var searchUrl = encodeURI(encodeURI("./search-page.html?content="+content+"&page="+j+""));
        $(".page-area").append("<a href='"+searchUrl+"'>"+j+"</a>")
      }          
    }
    else{
      for(var j = -4;j<1;j++){
        if(j+max_page_num == num_page) {
          $(".page-area").append("<div class='ignore'>"+(j+max_page_num)+"</div>")
          continue;
        }             
        var searchUrl = encodeURI(encodeURI("./search-page.html?content="+content+"&page="+(j+max_page_num)));
        $(".page-area").append("<a href='"+searchUrl+"'>"+(j+max_page_num)+"</a>")
      }        
    } 
  }
  else{
    for(var j = 1;j<=max_page_num;j++){
      if(j == num_page) {
        $(".page-area").append("<div class='ignore'>"+j+"</div>")
        continue;
      }   
      var searchUrl = encodeURI(encodeURI("./search-page.html?content="+content+"&page="+j));           
      $(".page-area").append("<a href='"+searchUrl+"'>"+j+"</a>")
    }            
  }
  //(下一页、尾页)
  if(num_page < max_page_num)
  {
    var searchUrl = encodeURI(encodeURI("./search-page.html?content="+content+"&page="+(num_page+1)));  
    $(".page-area").append("<a class='down-page' href='"+searchUrl+"'>下一页</a>")
    var searchUrl = encodeURI(encodeURI("./search-page.html?content="+content+"&page="+max_page_num));  
    $(".page-area").append("<a class='last-page' href='"+searchUrl+"'>尾页</a>")
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
        var searchUrl = encodeURI(encodeURI("./search-page.html?page=1&content="+content));   //使用encodeURI编码
        window.location.href = searchUrl;
      }
      else if($('#input_num').val() > max_page_num){
        var searchUrl = encodeURI(encodeURI("./search-page.html?content="+content+'&page='+max_page_num));   //使用encodeURI编码
        window.location.href = searchUrl;          
      }        
      else{
        var searchUrl = encodeURI(encodeURI("./search-page.html?content="+content+'&page='+$('#input_num').val()));   //使用encodeURI编码
        window.location.href = searchUrl;
      }
    }
  });    
}
