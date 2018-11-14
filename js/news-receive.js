document.write("<script src='js/function.js'></script>");

$(document).ready(function(){
  AOS.init({
    easing: 'ease-out-back',
    duration:'700'
  });

  var id = getUrlParam("id");
  var type = getUrlParam("type");

  $.get("mysql/news_data.php",{id:id},function(result){
    //标记回车
    //result = result.replace(/\\r\\n/g, "<p>");
    //result = result.replace(/\[img\]/g, "<img>");

    var jsonObj =  JSON.parse(result)
    //按照回车符分割
    var jsonStr = JSON.stringify(jsonObj.content);
    jsonArr = jsonStr.split("\\r\\n");
    //去除多余的双引号
    jsonArr[0] = jsonArr[0].replace(/"/,"");
    jsonArr[jsonArr.length-1] = jsonArr[jsonArr.length-1].slice(0,jsonArr[jsonArr.length-1].length-1);    
    //添加标签
    for(var i = 0;i<jsonArr.length;i++){
      if(jsonArr[i]){
        if(jsonArr[i] != "[img]")
        {
          jsonArr[i] = "<p>" + jsonArr[i] + "</p>";
        }
        else if(jsonArr[i] == "[img]")
        {
          jsonArr[i] = "<p><img></p>";
        }
      }
      else{
        jsonArr[i] = "";
      }
    }
    arr_result = jsonArr.join("");//并列字符串

    var arr_imgid = jsonObj.img_id.split(',');
    var str_c_time = [];
    $('div.news-title p').html(jsonObj.title);

    for(var i = 0;i<jsonObj.time.length-3;i++){
      if(i == 4){
        str_c_time.push("年");
      }
      else if(i == 7){
        str_c_time.push("月");
      }
      else if(i == 10){
        str_c_time.push("日 ");
      }      
      else{
        str_c_time.push(jsonObj.time[i]);
      }
    }

    $('div.send-time').html(str_c_time);
    $('div.news-content p').html(arr_result);
    for(var j = 0;j<arr_imgid.length;j++)
    {
      $("div.news-content img:eq('"+j+"')").attr('src','upload-img/news_img/'+arr_imgid[j]+'.jpg');
    }      

    $('div.news-content img').css({
      "margin":"40px auto",
      "display":"inherit",
      "max-height":"350px"
    })
    $('div.news-content p').css({
      "margin":"20px auto",
      "line-height":"30px"
    })        
  }); 
});