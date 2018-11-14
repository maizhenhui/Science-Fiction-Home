document.write("<script src='js/function.js'></script>");

$(document).ready(function(){
  
  var id = getUrlParam("id");

  $.get("mysql/reply_data.php",{id:id},function(result){
    if(result != "EMPTY")
    {
      var jsonObj =  JSON.parse(result);
      var jsonArr = [];
      for(var i =0 ;i < jsonObj.length;i++){
        jsonArr[i] = jsonObj[i];
        if(jsonArr[i].reply_author)
        {
          $(".wrap-reply-area ul").append("<li><div class='user-reply'><a href='./personal-space.html?uid=" + jsonArr[i].author_uid + 
            "'>" + "<img src='./user-profile/" + jsonArr[i].profile_id + ".jpg'></a>" + 
            "<div class='right-area'><a href='./personal-space.html?uid=" + jsonArr[i].author_uid + 
            "'>" + jsonArr[i].reply_author + "</a><p class='reply-data-time'>- " + jsonArr[i].reply_time + "</p>"
            + "<p class='reply-data-floor'>#" + jsonArr[i].reply_floor +  "</p><br />"
             + "<p class='reply-data-content'>" + jsonArr[i].reply_content + "</p></div></div></li>");
        }
        else{
          $(".wrap-reply-area ul").append("<li><div class='user-reply'><a href='./personal-space.html?uid=" + jsonArr[i].author_uid + 
            "'>" + "<img src='./user-profile/" + jsonArr[i].profile_id + ".jpg'></a>" + 
            "<div class='right-area'><a href='./personal-space.html?uid=" + jsonArr[i].author_uid + 
            "'>#" + jsonArr[i].author_uid + "</a><p class='reply-data-time'>- " + jsonArr[i].reply_time + "</p>"
            + "<p class='reply-data-floor'>#" + jsonArr[i].reply_floor +  "</p><br />"
             + "<p class='reply-data-content'>" + jsonArr[i].reply_content + "</p></div></div></li>");        
        }      
      }
    }
    else
      $(".wrap-reply-area ul").html("<li><div class='user-reply'>暂时无人留言，留下你的评论吧~</div></li>");
  });
});