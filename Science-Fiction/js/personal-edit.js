document.write("<script src='js/function.js'></script>");

$(document).ready(function(){
  AOS.init({
    easing: 'ease-out-back',
    duration:'700'
  });
  
  var submited = 0;
  
  if(!localStorage.uid)
  {
    window.location.href = 'login.html';
    return;
  }

  $.get("mysql/personal_data.php",{uid:localStorage.uid},function(result){
    if(result != "FAIL"){
      var jsonObj =  JSON.parse(result)
      var username=jsonObj.username;
      var sex=jsonObj.sex;
      var nickname=jsonObj.nickname;
      var sign=jsonObj.sign;
      var birthday=jsonObj.birthday;
      $("#username").text(username);
      $("input:radio[value='"+sex+"']").attr('checked', 'true');
      $("#nickname").val(nickname);
      $("#sign").val(sign);
      $("#birthday").attr('value', birthday);
      $("div.user-profile").css({
        "background":"url('./user-profile/"  + localStorage.pid + ".jpg')",
        "background-size":"cover",
        "border-radius": "50%",
        "width": "150px",
        "height": "150px",
        "float":"left",
        "cursor":"pointer"
       });
    }else{//假如用户不存在于数据库//如果没为URL指定参数，返回INDEX
      //localStorage.removeItem('username');
      //window.location.href = 'login.html';
    }  
  });

  $("button#button_submit").click(function(){
    if(!submited){
      //submited = 1;
      var nickname=$("input#nickname").val();
      var sign=$("textarea#sign").val();
      var sex=$("input[name='sex']:checked").val();
      var birthday=$("input#birthday").val();
      $.post("mysql/personal_edit.php",{uid:localStorage.uid,nickname:nickname,sign:sign,sex:sex,birthday:birthday},function(result){
      if(result == "ojbk"){
        alert("资料保存成功！");
        localStorage.nickname = nickname;
        if(!nickname)
        {
          localStorage.nickname = "#"+localStorage.uid;
        }
      }
      });
    }
  });
  $("button#button_exitlog").click(function(){
    localStorage.removeItem('nickname');
    localStorage.removeItem('uid');
    localStorage.removeItem('pid');
　　window.location.href = 'index.html';
  });
});