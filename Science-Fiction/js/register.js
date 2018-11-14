$(document).ready(function(){
  AOS.init({
    easing: 'ease-out-back',
    duration:'700'
  });

  //如果登录，跳转主页
  if(localStorage.uid)
    window.location.href = 'function.html'; 

  var submited = 0;//防止多点
  //监听INPUT值
  $("input#username").bind('input propertychange','input', function(){
      setTimeout(check_username,0);
  });
  $("input#password").bind('input propertychange','input', function(){
      setTimeout(check_password,0);
  });
  //when you click the submit button
  $("button#button_submit").click(function(){
    if(!submited){
      var username=$("input#username").val();
      var password=$("input#password").val();
      var sex=$('input[name="sex"]:checked').val();
      check_username();
      check_password();
      if(!check_username() || !check_password())
      {
        $("div#confirm_userdata").html('<p>请完成上述信息填写！</p>');
      }
      else{
        $.post("mysql/register.php",{username:username,password:password,sex:sex},function(result){
          if(result == "REGISTERED"){
            $("div#confirm_userdata").html('<p>该账号已经被注册！</p>');
          }     
          else{
            var jsonObj =  JSON.parse(result)
            var uid=jsonObj.uid;
            submited = 1;
            var t=3;
            timedCount();
            function timedCount()
            {
              if(t >= 1){
                $("div#confirm_userdata").html('<p>注册成功，' + t + ' 秒后跳转页面</p>');
                t --;
                setTimeout(timedCount,1000)
              }
            }
            
            localStorage.uid = uid;
            localStorage.nickname = "#"+uid;
            localStorage.pid = -1;

            function jumurl(){
        　　  window.location.href = 'function.html';
        　　}
        　　setTimeout(jumurl,3000);
          }
        });
      }
    }
  });   
  function check_username(){//延迟设置
  　var username=$("input#username").val();
    if(username.length <= 0)
    {
      $("input#username").css({
        "background-color":"transparent"
      });
      $("div#confirm_username").html("<p>账号不能为空！</p>");
      return 0;
    }
    else
    {
      $("input#username").css({
        "background-color":"white"
      });
      var reg=new RegExp("^[a-zA-Z0-9]+$");//正则表达式首中尾检测
      if(!reg.test(username)){
        $("div#confirm_username").html("<p>用户名由字母与数字组成！</p>");
        return 0;
      }
      else if(username.length < 6){
        $("div#confirm_username").html("<p>用户名字符不得少于6位！</p>");
        return 0;
      }
      else if(username.length > 16){
        $("div#confirm_username").html("<p>用户名字符不得超过16位！</p>");
        return 0;
      }          
      else{
        $("div#confirm_username").html("<p>格式正确</p>");
        return 1;
      }
    }
    return 0;
  }
  function check_password(){//延迟设置
    var password=$("input#password").val();
    if(password.length <= 0)
    {
      $("input#password").css({
      "background-color":"transparent"
      });
      $("div#confirm_password").html("<p>密码不能为空！</p>");
      return 0;
    }
    else
    {
      var reg=new RegExp("^[a-zA-Z0-9]+$");//正则表达式首中尾检测
      $("input#password").css({
        "background-color":"white"
      });
      if(!reg.test(password)){
        $("div#confirm_password").html("<p>密码由字母与数字组成！</p>");
        return 0;
      }
      else if(password.length < 6){
        $("div#confirm_password").html("<p>密码字符不得少于5位！</p>");
        return 0;
      }
      else if(password.length > 16){
        $("div#confirm_password").html("<p>密码字符不得超过18位！</p>");
        return 0;
      }          
      else{
        $("div#confirm_password").html("<p>格式正确</p>");
        return 1;
      }
    }
    return 0;
  }
});
