$(document).ready(function(){
  var jcropApi,
  boundx,
  boundy,

  $preview = $('#wrap-preview'),
  $pcnt = $('#wrap-preview .preview-container'),
  $pimg = $('#wrap-preview .preview-container img'),

  xsize = $pcnt.width();
  ysize = $pcnt.height();
  var resize_x,resize_y,resize_w,resize_h,resize_src,source_w,source_h;

  function updatePreview(c)
  {
    if (parseInt(c.w) > 0)
    {
      var rx = xsize / c.w;
      var ry = ysize / c.h;

      $pimg.css({
        width: Math.round(rx * boundx) + 'px',
        height: Math.round(ry * boundy) + 'px',
        marginLeft: '-' + Math.round(rx * c.x) + 'px',
        marginTop: '-' + Math.round(ry * c.y) + 'px'
      });    
      //缩放比例调整
      resize_x = c.x * (source_w / boundx);
      resize_y = c.y * (source_h / boundy);
      resize_w = c.w * (source_w / boundx);
      resize_h = c.h * (source_h / boundy);
    }
  };  

  $('#upload_file').fileupload({
      dataType: 'json',
      url: "./mysql/img_upload.php",//文件的后台接受地址
      progressall: function (e, data) {
        var progress = parseInt(data.loaded / data.total * 100);
      },
      done: function (e, data) {
        $(".user-profile").remove();
        $(".wrap-insertbg").append("<div class='bg-container'><img></div>");
        setTimeout(img_resize(data.result.pic_url),1000);
        resize_src = data.result.pic_url;
        console.log(data.result.pic_url);
      }
  }); 

  function img_resize(img_src){
　　getImgNaturalDimensions(img_src, function(dimensions){
  　　//console.log(dimensions.w + "  " + dimensions.h);
      var w = dimensions.w;
      var h = dimensions.h;
      source_w = dimensions.w;
      source_h = dimensions.h;
      var x = w/h;
      if(w > h){
        $(".bg-container img").css({
          "position":"absolute",
          "width": "150px", 
          "height": 150/x + "px",
        }); 
        $("div.bg-container").css({
          "height": 150/x  + "px", 
          "width": "150px",
          "position":"relative",
          "margin": "auto",
          "border":"solid black",
          "border-width":(150-(150/x))/2 + "px" + " 0px"
        }); 
      }
      else{
        $(".bg-container img").css({
          "position":"absolute",
          "width": 150*x  + "px", 
          "height": "150px"
        }); 
        $("div.bg-container").css({
          "width": 150*x  + "px", 
          "height": "150px",
          "position":"relative",
          "margin": "auto",
          "border":"solid black",
          "border-width":"0px " + (150-(150*x))/2 + "px" + " 0px"
        }); 
      }
      $(".i-profile img").attr("src",img_src);

      var imgNode = $(".bg-container").find('img')
      var img = imgNode[0]
      //调用编辑框
      imgNode.Jcrop({
        onChange: updatePreview,
        onSelect: updatePreview, 
        allowSelect: false,
        aspectRatio:1,
        createHandles:[
          'nw','ne','se','sw'
        ]
      },function(){
        // Use the API to get the real image size
        var bounds = this.getBounds();
        boundx = bounds[0];
        boundy = bounds[1];

        jcropApi = this;
　　　});

      jcropApi.setSelect([
          0,
          0,
          100,
          100
      ]);
    });
  }
  function getImgNaturalDimensions(img_src, callback) {
    var nImg = new Image();
　　nImg.src = img_src;
　　if(nImg.complete) {
      callback({w: nImg.width, h:nImg.height});
    }
    else{
　　　nImg.onload = function () {
        callback({w: nImg.width, h:nImg.height});
      }
    }     
  }

  $("button#button_submit").click(function(){
    if(resize_src){
      $.post("mysql/upload_profile.php",{x:resize_x,y:resize_y,w:resize_w,h:resize_h,src:resize_src,uid:localStorage.uid},function(result){
        console.log(result);
        localStorage.pid = result;
        window.location.href="personal-edit.html";
      });
    }
  });
});