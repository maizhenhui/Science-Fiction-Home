document.write("<script src='../js/function.js'></script>");

var max_data_num = 12;//每页的条数
var page = 1;//当前页数

$(document).ready(function(){
  var refresh_type = getUrlParam("refresh_type");
  if(refresh_type)
    $('select#type').val(refresh_type);

  var type = $('select#type option:selected').val();

  $.get("mysql/list_num.php",{type:type,max_data_num:max_data_num},function(result){
    div_page(type,1,result); 
    refresh_listdata(type,page,max_data_num);
  });

  $('select#type').change(function(){
    var type = $('select#type option:selected').val();

    $.get("mysql/list_num.php",{type:type,max_data_num:max_data_num},function(result){
      div_page(type,1,result);   
      refresh_listdata(type,page,max_data_num)
    });
  });
});

function refresh_listdata(type,page,max_data_num){
  $('.wrap-list-content ul li').remove();

  $.get("mysql/list_data.php",{type:type,page:page,max_data_num:max_data_num},function(result){
    var jsonObj =  JSON.parse(result);
    var jsonArr = [];
    for(var i = 0 ;i < jsonObj.length;i++){
      jsonArr[i] = jsonObj[i];
      $(".wrap-list-content ul").append("<li><div class='list-list'><p style='width:50px;text-align:right;padding-left:10px;float:left;'>" + jsonArr[i].id
       + "</p><p style='width:400px;text-align:center;padding-left:50px;float:left;'>" + jsonArr[i].title + "</p>" + 
       "<a class='f-l-a' href='mysql/list_operation.php?type=" + type + "&id=" + jsonArr[i].id + "'>删除</a></div>" +
       "<a class='f-l-a' href='culture-edit.html?type=" + type + "&id=" + jsonArr[i].id + "'>编辑</a></div>" + 
       "<div class='line' style='width: 640px;height:1px;background-color: #e5e9ef;margin:5px auto;float:left;'></div></li>");
    }
    $('.wrap-list-content ul li').css({
      "height":'35px'
    });  
    $('.f-l-a').css({
      "float":'left',
      "width":"70px",
      "text-align":"center"
    });
  });
}

function div_page(type,num_page,max_page_num){
  //分页栏
  //(上一页、首页)
  $('.page-area a').remove();
  $('.page-area div').remove();
  $('.jump-area span').remove();
  $('.jump-area input').remove();  
  $('.jump-area button').remove();

  $(".page-area").append("<div class='first-page'>首页</div>")
  $(".page-area").append("<div class='up-page''>上一页</div>")

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
        $(".page-area").append("<div class='page-num'>"+(j+num_page)+"</div>")
      }    
    }
    else if(num_page <= 3){
      for(var j = 1;j<=5;j++){
        if(j == num_page) {
          $(".page-area").append("<div class='ignore'>"+j+"</div>")
          continue;
        }
        $(".page-area").append("<div class='page-num'>"+j+"</div>")
      }          
    }
    else{
      for(var j = -4;j<1;j++){
        if(j+max_page_num == num_page) {
          $(".page-area").append("<div class='ignore'>"+(j+max_page_num)+"</div>")
          continue;
        }             
        $(".page-area").append("<div class='page-num'>"+(j+max_page_num)+"</div>")
      }        
    } 
  }
  else{
    for(var j = 1;j<=max_page_num;j++){
        if(j == num_page) {
          $(".page-area").append("<div class='ignore'>"+j+"</div>")
          continue;
        }        
      $(".page-area").append("<div class='page-num'>"+j+"</div>")
    }            
  }
  //(下一页、尾页)
  $(".page-area").append("<div class='down-page'>下一页</div>")
  $(".page-area").append("<div class='last-page'>尾页</div>")
  //跳页
  $(".jump-area").append("<span style='float:left;'>跳至</span>")
  $(".jump-area").append("<input id='input_num' maxlength='3' oninput=\"value=value.replace(/[^\\d]/g,'')\" style='float:left;border:1px solid #dacccc;outline:none;width:25px;margin:1px 15px;padding:2px 5px;text-align:center;'>")
  $(".jump-area").append("<span style='float:left;'>页</span>")
  $(".jump-area").append("<button id='jump_page' style='float:left;margin:0px 10px;margin-top:2px;cursor:pointer;width:45px;background:rgb(113, 100, 162);color:white;'>确认</button>")
  $(".jump-area").append("<span style='float:left;letter-spacing:5px;color:#a08f8f;font-weight:150'>共"+max_page_num+"页</span>")

  $('#jump_page').click(function(){
    if($('#input_num').val()){
      if($('#input_num').val() <= 0){
        page = 1;
        refresh_listdata(type,page,max_data_num);
        div_page(type,page,max_page_num);
      }
      else if($('#input_num').val() > max_page_num){
        page = max_page_num;
        refresh_listdata(type,page,max_data_num);
        div_page(type,page,max_page_num);
      }        
      else{
        page = $('#input_num').val();
        refresh_listdata(type,page,max_data_num);
        div_page(type,page,max_page_num);
      }
    }
  });
  $('.first-page').click(function(){
    page = 1;
    refresh_listdata(type,page,max_data_num);
    div_page(type,page,max_page_num);
  });  
  $('.last-page').click(function(){
    page = max_page_num;
    refresh_listdata(type,page,max_data_num);
    div_page(type,page,max_page_num);
  });    
  $('.up-page').click(function(){
    if(page > 1){
      page -= 1;
      refresh_listdata(type,page,max_data_num);
      div_page(type,page,max_page_num);
    }
  });  
  $('.down-page').click(function(){
    if(page < max_page_num){
      page += 1;
      refresh_listdata(type,page,max_data_num);
      div_page(type,page,max_page_num);
    }
  });    
  $('.page-num').click(function(){
      page = parseInt($(this).text());
      refresh_listdata(type,page,max_data_num);
      div_page(type,page,max_page_num);
  });         

  //样式
  $('.page-area div').css({
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
  $('.page-area a,.page-area div').css({
    "text-align":"center",
    "color":"black",
    "height":"20px",
    "line-height":"20px",
    "text-decoration":"none",
    "margin":"0px 2px",
    "float":"left"
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
}