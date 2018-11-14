document.write("<script src='../js/function.js'></script>");

$(document).ready(function(){
  var refresh_type = getUrlParam("refresh_type");
  if(refresh_type)
    $('select').val(refresh_type);

  var type = $('select option:selected').val();

  change_list(type);

  $('select').change(function(){
    type = $('select option:selected').val();

    change_list(type);
  });

  $('#button_submit').click(function(){
    var arr_id = [];
    for(var i = 0;i<10;i++){
      arr_id[i] =  $("#edit_id_"+ (i+1)).val();
    }

    $.get("mysql/rank_edit.php",{type:type,arr_id:arr_id},function(result){
      window.location.href='./rank-edit.html?refresh_type='+type;
      console.log(result);
    });
  });
});

function change_list(type){
  $('.wrap-rank-content ul li').remove();

  $.get("mysql/rank_data.php",{type:type},function(result){
    var jsonObj =  JSON.parse(result);
    var jsonStr1 = JSON.stringify(jsonObj);
    var jsonArr = [];
    var rank = 0;
    for(var i =0 ;i < jsonObj.length;i++){
      jsonArr[i] = jsonObj[i];
      switch(type){
        case 'movie':rank = jsonArr[i].rank;break;
        case 'novel':rank = jsonArr[i].rank - 10;break;
        case 'comic':rank = jsonArr[i].rank - 20;break;
        default:break;
      }
      $(".wrap-rank-content ul").append("<li><div class='rank-list'><p style='width:50px;text-align:center;padding-left:10px;float:left;'>" + rank
         + "</p><p style='width:400px;text-align:center;padding-left:50px;float:left;'>" + jsonArr[i].title + "</p>" + 
         "<input id='edit_id_" + (i+1) + "' type='text' style='float:left;width:140px;text-align:center;outline:none;' value='" + jsonArr[i].id + "'></div>" + 
         "<div class='line' style='width: 640px;height:1px;background-color: #e5e9ef;margin:5px auto;float:left;'></div></li>");
    }
    $('.wrap-rank-content ul li').css({
      "height":'35px'
    });      
  });
}