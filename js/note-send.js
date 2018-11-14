$(document).ready(function(){
  AOS.init({
    easing: 'ease-out-back',
    duration:'700'
  });
  
  if(!localStorage.uid)
    window.location.href = 'login.html';

  var uid=localStorage.uid;
  var nickname=localStorage.nickname;
  var submited = 0;

  $("div#login_author").text(nickname);

  $("input#send_title").bind('input propertychange','input', function(){
    setTimeout(check_title,0);
  });
  $("textarea#send_content").bind('input propertychange','textarea', function(){
    setTimeout(check_content,0);
  }); 

  $("button#button_submit").click(function(){
    if(uid)
    {
      check_content();
      check_title();
      if(!check_title() || !check_content()){
        $("div#confirm_result").html("<p>请完成上述信息填写！</p>");
      }
      else{
        if(!submited){
          var title=$("input#send_title").val();
          var content=$("textarea#send_content").val();
          submited = 1;
          $.post("mysql/note_send.php",{uid:uid,title:title,content:content},function(result){
            alert("想法发送成功！");
        　　window.location.href = 'detail.html?id='+result;
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

  function check_title(){//延迟设置
    var title=$("input#send_title").val();
    if(title.length <= 0)
    {
      $("div#confirm_title").html("<p>标题未填写！</p>");
      return 0;
    }
    else
    {
      $("div#confirm_title").html("");
      return 1;
    }
    return 0;
  }
  function check_content(){//延迟设置
    var content=$("textarea#send_content").val();
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