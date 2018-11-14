var lastEditRange;

function set_focus()
{
  var sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(lastEditRange);
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

function getPos(data)
{
  if($("#novel_content p").length==1 && $("#novel_content p").html() == "<br>")
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

$(document).ready(function(){
  $("#novel_content").on("paste", function (e) {
      textInit(e)
  });

  $('#novel_content').keyup(function(){
    // 获取选定对象
    var selection = getSelection()
    // 设置最后光标对象
    lastEditRange = selection.getRangeAt(0)
  });
  $('#novel_content').click(function(){
    // 获取选定对象
    var selection = getSelection()
    // 设置最后光标对象
    lastEditRange = selection.getRangeAt(0)
  });

  $('#novel_content').append("<p><br></p>");

  var animation
  $('#novel_content').keyup(function(){
    if(!$(this).html()){
      clearTimeout(animation);
      animation = setTimeout(function(){
      $('#novel_content').append("<p><br></p>"); 
      },10);
    }
  })  

  var src = [];
  $('#chooseImage').fileupload({
    url: "./mysql/upload_img.php",//文件的后台接受地址
    done: function (e, data) {
      if(lastEditRange)
      {
        set_focus();
        getPos(escape(data.result));
      }
      else{
        $("#novel_content p").html("");
        $("#novel_content p").append("<img src=\""+escape(data.result)+"\" style=\"display: block; max-width: 100px; margin: 0px auto;\">").before("<p><br></p>").after("<p><br></p>")
        var range = window.getSelection();//创建range
        var obj = document.getElementsByTagName("p")
        range.selectAllChildren(obj[2]);//range 选择obj下所有子内容
        range.collapseToEnd();  
        lastEditRange = range.getRangeAt(0);      
      }
    }
  });

  $("#button_submit").click(function(){
    var title = $("#novel_title").val();
    var content = $("#novel_content").html();
    var arr = new Array();
    var img_number = $("#novel_content p img").length;
    content = content = content.replace(new RegExp("<p><br></p>",'g'),"");
    content = content.replace(/<p>/g, "");
    content = content.replace(/<p contenteditable="false">/g, "");
    content = content.replace(new RegExp("</p>",'g'), "\r\n");
    content = content.replace(/<br>/g, "\r\n");
    content = content.replace(/&nbsp;/g, "");

    for(var i = 0;i < img_number; i++){
      src[i] = $("#novel_content p img:eq("+i+")").attr("src");
      (function(i){
        setTimeout(function(){
          content = content.replace(new RegExp("<img src=\""+src[i]+"\" style=\"display: block; max-width: 100px; margin: 0px auto;\">",'g'), "[img]");
          console.log(content);
          $.post("./mysql/move_file.php",{type:'novel',number:(i + 1),src:src[i]},function(result){
            arr.push(result);
            console.log("imgid:"+result);
          });            
        }, 10);
      })(i)
    }
    setTimeout(function(){
      arr.sort();
      var str=arr.join(",");
      $.post("./mysql/upload_data.php",{type:'novel',title:title,content:content,img_id:str,number:img_number},function(result){
        alert("发送成功！");
        window.location.href = '../culture-page.html?type=novel&id='+result;
      });
    },1000); 
  }); 
});