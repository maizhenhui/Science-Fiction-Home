$(document).ready(function(){
  AOS.init({
    easing: 'ease-out-back',
    duration:'700'
  });
  
  //如果登录，跳转到个人中心  
  if(localStorage.uid)
    window.location.href = 'function.html';

  var submited = 0;//防止多点
  //when you keyup,check it
  $("input#username").bind('input propertychange','input', function(){
    setTimeout(check_username,0);
  });
  $("input#password").bind('input propertychange','input', function(){
    setTimeout(check_password,0);
  });  

  //when you click the submit button
  $("button#button_submit").click(function(){
    if(!submited)
    {
      check_username();
      check_password();
      if(!check_username() || !check_password())
        $("div#confirm_userdata").html("<p>请完成上述信息填写！</p>");
      else{
        var username=$("input#username").val();
        var password=$("input#password").val();
        $.post("mysql/login.php",{username:username,password:password},function(result){//数据发送到后台
          if(result == "FAILED"){
            $("div#confirm_userdata").html('<p>账号或密码错误</p>');
          }
          else{
            var jsonObj =  JSON.parse(result)
            var uid=jsonObj.uid;
            var nickname=jsonObj.nickname;
            var pid=jsonObj.pid;
            var isadmin=jsonObj.isadmin;
            var bg=jsonObj.bg;
            submited=1;
            var t=3;
            timedCount();
            function timedCount()
            {
              if(t >= 1){
                $("div#confirm_userdata").html('<p>登录成功，' + t + ' 秒后跳转页面</p>');
                t --;
                setTimeout(timedCount,1000)
              }
            }
            localStorage.uid = uid;
            localStorage.pid = pid;//记住ID
            localStorage.nickname = nickname;
            localStorage.isadmin = isadmin;
            localStorage.bg = bg;
            if(!nickname){
              localStorage.nickname = "#"+uid;
            }
            function jumurl(){
        　　  window.location.href = 'function.html';
        　　}
        　　setTimeout(jumurl,3000);
          }
        });
      }
    }
  });    

  function check_username(){
    var username=$("input#username").val();
    if(username.length <= 0)
    {
      $("div#confirm_username").html("<p>账号不能为空！</p>");
      return 0;
    }
    else{
      $("div#confirm_username").html("");
      return 1;
    }
    return 0;
  }
  function check_password(){
    var password=$("input#password").val();
    if(password.length <= 0)
    {
      $("div#confirm_password").html("<p>密码不能为空！</p>");
      return 0;
    }
    else
    {
      $("div#confirm_password").html("");
      return 1;
    }
    return 0;
  }
});