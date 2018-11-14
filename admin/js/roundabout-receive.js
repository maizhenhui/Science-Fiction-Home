$(document).ready(function(){
  var arr = new Array();
  var src = [];

  $.get("./mysql/roundabout_data.php",function(result){
    var jsonObj =  JSON.parse(result);
    var jsonStr1 = JSON.stringify(jsonObj);
    var jsonArr = [];
    for(var i =0 ;i < jsonObj.length;i++){
      jsonArr[i] = jsonObj[i];

      $(".wrap-roundabout-content ul").append("<li><p style='width:80px;text-align:center;padding-left:10px;float:left;'>" + jsonArr[i].id
       + "</p><p style='width:250px;height:80px;text-align:center;float:left;'>" + jsonArr[i].title + "</p>"
        + "<label for='upload_"+(i+1)+"'><img id='img_"+(i+1)+"'' style='width:200px;float:left;height:120px;cursor:pointer;' src='../upload-img/roundabout_img/" + jsonArr[i].img_id + ".jpg'></label>" + 
       "<input type='file' id='upload_"+(i+1)+"' style='display: none;'' name='file' accept='image/png,image/jpeg,image/gif' multiple='multiple' />" +
       "<input id='edit_id_" + (i+1) + "' type='text' style='float:left;width:110px;text-align:center;outline:none;' value='" + jsonArr[i].news_id + "'></div>" + 
       "<div class='line' style='width: 640px;height:1px;background-color: #e5e9ef;margin:5px auto;float:left;'></li>");
    }
    $('.wrap-roundabout-content ul li').css({
      "display":"inline-block"
    });   
    $('.roundabout-list').css({
      "height":'80px'
    });  
    for(var i = 0;i<5;i++){
      (function(i){
        setTimeout(function(){
          $('#upload_'+(i+1)).fileupload({
            url: "./mysql/upload_img.php",
          }).bind('fileuploaddone', function (e, data) {
            src[i] = data.result;
            console.log("#img_"+(i+1));
            console.log(data.result);
            $("#img_"+(i+1)).attr("src",data.result);
          });   
        },100);
      })(i);
    }     
  });

  $('#button_submit').click(function(){
    var arr_id = [];

    for(var i = 0;i<5;i++){
      arr_id[i] =  $("#edit_id_"+ (i+1)).val();
    }

    var number = 0;
    for(var i = 0;i<5;i++)
    {
      if(src[i]){
        (function(i){
          setTimeout(function(){
            number ++;
            $.post("./mysql/move_file.php",{id:i,type:'roundabout',number:number,src:src[i]},function(result){
              console.log(result);
            });            
          }, 10);
        })(i)
      }
    }

    $.get("mysql/roundabout_edit.php",{arr_id:arr_id},function(result){
      //window.location.href='./roundabout-edit.html';
      alert("成功！");
      console.log(result);
    });
  });
});