$(document).ready(function(){

  if(localStorage.bg != -1)
  {  
    $('body').prepend("<iframe frameborder='0' scrolling=no style='position: fixed;width:100%;height:100%;'></iframe>")
    $.getJSON("json/background.json", function (data){
      $.each(data, function (infoIndex, info){
        if(infoIndex == localStorage.bg)
          $("iframe").attr("src",info["url"]);
      });
    });
  }
  else{
    // $('body').css({
    //   'background':"url(./dynamic-background/default-background.jpg) fixed",
    //   'background-repeat': 'no-repeat',
    //   'background-size': 'cover'
    // })
  }
});