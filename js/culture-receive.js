document.write("<script src='js/function.js'></script>");

$(document).ready(function(){
  AOS.init({
    easing: 'ease-out-back',
    duration:'700'
  });

  var id = getUrlParam("id");
  var type = getUrlParam("type");

  $.get("mysql/culture_data.php",{id:id,type:type},function(result){
    //标记回车
    // result = result.replace(/\\r\\n/g, "<p>");
    // result = result.replace(/\[img\]/g, "<img>");

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
    $('div.culture-title p').html(jsonObj.title);
    $('div.culture-content p').html(arr_result);
    for(var j = 0;j<arr_imgid.length;j++)
    {
      switch(type)
      {
        case 'comic':$("div.culture-content img:eq('"+j+"')").attr('src','upload-img/comic_img/'+arr_imgid[j]+'.jpg');break;
        case 'novel':$("div.culture-content img:eq('"+j+"')").attr('src','upload-img/novel_img/'+arr_imgid[j]+'.jpg');break;
        case 'movie':$("div.culture-content img:eq('"+j+"')").attr('src','upload-img/movie_img/'+arr_imgid[j]+'.jpg');break;
      }
    }
    
    $('div.culture-content img').css({
      "margin":"40px auto",
      "display":"inherit",
      "max-height":"350px"
    })
    $('div.culture-content p').css({
      "margin":"20px auto",
      "line-height":"30px"
    })    
  }); 
});