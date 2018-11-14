document.write("<script src='js/function.js'></script>");

$(document).ready(function(){
  AOS.init({
    easing: 'ease-out-back',
    duration:'700'
  });

  $("fieldset").hover(
    function(){
      $(this).animate({
        opacity:'0.95'
      },'fast');
    },
    function(){
      $(this).animate({
        opacity:'0.75'
      },'fast'); 
    }
  );

  var id = getUrlParam("id");

  $.get("mysql/detail.php",{id:id},function(result){
    var jsonObj =  JSON.parse(result)
    $("#note_title").text(jsonObj.title);
    $("#note_content").text(jsonObj.content);
    $("#note_time").text(jsonObj.time);
    if(jsonObj.author)
    {
      $("#note_author").html("<span class=\"note-data\">" + jsonObj.author + "</span>");
    }
    else{
      $("#note_author").html("<span class=\"note-data\">#" + jsonObj.uid + "</span>");
    }
    $("#note_author").attr("href","./personal-space.html?uid=" + jsonObj.uid);
  });

  if(!localStorage.uid)
    $("button").hide();
  else{
    $("button").click(function(){
      window.location.href = 'note-reply.html?id=' + id;
    });
  }
});