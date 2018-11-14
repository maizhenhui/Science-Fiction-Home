document.write("<script src='js/function.js'></script>");

$(document).ready(function(){
  AOS.init({
    easing: 'ease-out-back',
    duration:'700'
  });
  
  var uid = getUrlParam("uid")
  
  $.get("mysql/personal_data.php",{uid:uid},function(result){
    if(result != "FAIL"){
      var jsonObj =  JSON.parse(result)
      var nickname=jsonObj.nickname;
      var sex=jsonObj.sex;
      var birthday=jsonObj.birthday;
      var sign=jsonObj.sign;
      var profile=jsonObj.profile_id;

      if(!nickname){
          $(".personal-title").text("# " + uid + " 的个人中心");
        $("div#login_username").text("未设置");
      }
      else{
        $(".personal-title").text(nickname + " 的个人中心");
        $("div#login_username").text(nickname);
      }
      var chinese_sex = (sex == "male") ? "男" : "女";
      $("div#login_sex").text(chinese_sex);
      if(!birthday)
        $("div#login_date").text("未设置");
      else 
        $("div#login_date").text(birthday);
      if(!sign)
        $("div#login_sign").text("未设置");
      else
        $("div#login_sign").text(sign);

      $("div.user-profile").css({
        "background":"url('./user-profile/"  + profile + ".jpg')",
        "background-size":"cover"
      });
    }else{//假如用户不存在于数据库//如果没为URL指定参数，返回INDEX
      //localStorage.removeItem('username');
      window.location.href = 'login.html';
    }
  });
});