document.write("<script src='js/function.js'></script>");

$(document).ready(function(){
  AOS.init({
    easing: 'ease-out-back',
    duration:'700'
  });
  
  var id = getUrlParam("id");
  var submited=0;

  if(!localStorage.uid){
    window.location.href = 'login.html';
    return;
  }

  $.get("mysql/forjs_function.php",{function:"find_title_by_id",id:id},function(result){
    $("#reply_title").text(result);
  });

  $("button#button_submit").click(function(){
    if(localStorage.uid)
    {
      if(!check_content()){
        $("div#confirm_result").html("<p>请完成上述信息填写！</p>");
      }
      else{
        if(!submited){
          var content=$("textarea#reply_content").val();
          submited = 1;
          $.get("mysql/note_reply.php",{id:id,uid:localStorage.uid,content:content},function(result){
            function jumurl(){
        　　  window.location.href = 'detail.html?id=' + id;
        　　}
        　　jumurl();
          });
        } 
      }
    }
    else{
      $("div#confirm_result").html("<p>请先登录！三秒后跳回登录界面</p>");
      function jumurl(){
        window.location.href = 'login.html';
      }
      setTimeout(jumurl,3000);
    }
  }); 

  $("textarea#reply_content").bind('input propertychange','textarea', function(){
    setTimeout(check_content,0);
  }); 

  function check_content(){//延迟设置
    var content=$("textarea#reply_content").val();
    if(content.length <= 0)
    {
      $("div#confirm_content").html("<p>内容未填写！</p>");
      return 0;
    }
    else
    {
      $("div#confirm_content").html("");
      return 1;
    }
    return 0;
  }     
});