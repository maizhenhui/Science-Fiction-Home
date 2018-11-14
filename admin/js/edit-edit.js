document.write("<script src='../js/function.js'></script>");

var lastEditRange;

function set_focus()
{
  var sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(lastEditRange);
}

function getPos(data)
{
  if($("#edit_content p").length==1 && $("#edit_content p").html() == "<br>")
  {
    var obj = document.getElementsByTagName("p")
    var range = window.getSelection();//创建range
    range.selectAllChildren(obj[0]);//range 选择obj下所有子内容
    range.collapseToEnd();
  }  

  var range = window.getSelection().getRangeAt(0);//找到焦点位置
  var img = document.createElement('img');
  img.style = "display:block;max-width:100px;margin:0px auto;";
  img.setAttribute("src",data);
  range.insertNode(img);//在焦点插入节点

  var arr_div = [];

  //上半段
  var p1 = document.createElement('p');
  p1.innerHTML = "<br>";
  img.parentNode.before(p1);

  //下半段
  var p2 = document.createElement('p');
  p2.innerHTML = "<br>";
  img.parentNode.after(p2);

  range.collapse(false);
  img.parentNode.setAttribute("contenteditable","false");

  if(img.parentNode.children[0].tagName == "IMG")
  {
    p1.innerHTML = img.parentNode.innerHTML.replace(new RegExp("<img src=\""+data+"\" style=\"display: block; max-width: 100px; margin: 0px auto;\">"), "|");
    arr_div = p1.innerHTML.split('|');
    img.parentNode.innerHTML = "<img src=\""+data+"\" style=\"display: block; max-width: 100px; margin: 0px auto;\">"

    if(arr_div[0])
      p1.innerHTML = arr_div[0];
    else
      p1.innerHTML = "<br>";
    if(arr_div[1])
      p2.innerHTML = arr_div[1];
    else
      p2.innerHTML = "<br>";
  }
  else if(img.parentNode.children[1].tagName == "IMG"){
     img.parentNode.children[0].remove();
  }  
  var range = window.getSelection();//创建range
  range.selectAllChildren(p2);//range 选择obj下所有子内容
  range.collapseToEnd();  
  lastEditRange = range.getRangeAt(0);
}

function textInit(e) {
    e.preventDefault();
    var text;
    var clp = (e.originalEvent || e).clipboardData;
    if (clp === undefined || clp === null) {
        text = window.clipboardData.getData("text") || "";
        if (text !== "") {
            if (window.getSelection) {
                var newNode = document.createElement("span");
                newNode.innerHTML = text;
                window.getSelection().getRangeAt(0).insertNode(newNode);
            } else {
                document.selection.createRange().pasteHTML(text);
            }
        }
    } else {
        text = clp.getData('text/plain') || "";
        if (text !== "") {
            document.execCommand('insertText', false, text);
        }
    }
}

$(document).ready(function(){
  $("#edit_content").on("paste", function (e) {
      textInit(e)
  });

  $('#edit_content').keyup(function(){
    // 获取选定对象
    var selection = getSelection()
    // 设置最后光标对象
    lastEditRange = selection.getRangeAt(0)
  });
  $('#edit_content').click(function(){
    // 获取选定对象
    var selection = getSelection()
    // 设置最后光标对象
    lastEditRange = selection.getRangeAt(0)
  });

  var src = [];
  $('#chooseImage').fileupload({
    url: "./mysql/upload_img.php",
    done: function (e, data) {
      if(lastEditRange)
      {
        set_focus();
        getPos(escape(data.result));
      }
      else{
        $("#edit_content p").last().html("");
        $("#edit_content p").last().append("<img src=\""+escape(data.result)+"\" style=\"display: block; max-width: 100px; margin: 0px auto;\">").before("<p><br></p>").after("<p><br></p>")
        var range = window.getSelection();//创建range
        var obj = document.getElementsByTagName("p").last();
        range.selectAllChildren(obj);//range 选择obj下所有子内容
        range.collapseToEnd();  
        lastEditRange = range.getRangeAt(0);      
      }
    }
  }); 

  var type = getUrlParam("type");
  var id = getUrlParam("id");

  $.get("../mysql/culture_data.php",{type:type,id:id},function(result){
    var jsonObj =  JSON.parse(result);
    var arr_imgid = jsonObj.img_id.split(',');
    var jsonArr = [];
    var arr_result = [];
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
          jsonArr[i] = "<p contenteditable='false'><img></p>";
        }
      }
      else{
        jsonArr[i] = "<p><br></p>";
      }
    }
    arr_result = jsonArr.join("");//并列字符串
    // console.log(jsonArr)
    //console.log(arr_result)

    $('.edit-title').val(jsonObj.title);
    $('.edit-content').html(arr_result);
    for(var j = 0;j<arr_imgid.length;j++)
    {
      switch(type)
      {
        case 'news':$("img:eq('"+j+"')").attr('src','../upload-img/news_img/'+arr_imgid[j]+'.jpg');break;
        case 'comic':$("img:eq('"+j+"')").attr('src','../upload-img/comic_img/'+arr_imgid[j]+'.jpg');break;
        case 'novel':$("img:eq('"+j+"')").attr('src','../upload-img/novel_img/'+arr_imgid[j]+'.jpg');break;
        case 'movie':$("img:eq('"+j+"')").attr('src','../upload-img/movie_img/'+arr_imgid[j]+'.jpg');break;
      }
    }    

    $('.edit-content img').css({
      "display":"block",
      "max-width":"100px",
      "margin":"0px auto"
    });
    //判断开头和结尾的P标签是否有图片
    // console.log($(".edit-content").children().first().children().prop("tagName"));
    // console.log($(".edit-content").children().last().children().prop("tagName"));
    if($(".edit-content").children().first().children().prop("tagName") == "IMG")
    {
      $($(".edit-content").children().first()).before("<p><br></p>")
    }
    if($(".edit-content").children().last().children().prop("tagName") == "IMG")
    {
      $($(".edit-content").children().last()).after("<p><br></p>")
    }    
  });

  $("#button_submit").click(function(){
    var title = $("#edit_title").val();
    var content = $("#edit_content").html();
    var arr = new Array();
    var img_number = $("#edit_content p img").length;
    content = content.replace(new RegExp("<p><br></p>",'g'),"");
    //content = content.replace(/<p>/, "");//先取掉第一个标签
    content = content.replace(/<p>/g, "\r\n");
    content = content.replace(/<p contenteditable="false">/g, "\r\n");
    content = content.replace(new RegExp("</p>",'g'), "");
    content = content.replace(/<br>/g, "\r\n");
    content = content.replace(/&nbsp;/g, "");

    //console.log(content);

    for(var i = 0;i < img_number; i++){
      src[i] = $("#edit_content p img:eq("+i+")").attr("src");
      (function(i){
        setTimeout(function(){
          content = content.replace(new RegExp("<img src=\""+src[i]+"\" style=\"display: block; max-width: 100px; margin: 0px auto;\">",'g'), "[img]");
          $.post("./mysql/move_file.php",{type:type,number:(i + 1),src:unescape(src[i]),id:id},function(result){
             arr.push(result);
             console.log("imgid:"+result);
          });            
        }, 10);
      })(i)
    }
    setTimeout(function(){
      arr.sort();
      var str=arr.join(",");
      console.log("c:"+str);
      $.post("./mysql/edit_data.php",{id:id,type:type,title:title,content:content,img_id:str,number:img_number},function(result){
        alert("保存成功！");
        window.location.href = './culture-edit.html?id='+id+"&type="+type;
      });
    },1000); 
  }); 

});