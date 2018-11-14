<?php 
  include '../../mysql/mysql_conf.php';

  function get_extension($file)
  {
    return pathinfo($file, PATHINFO_EXTENSION);
  }

  $src = $_REQUEST['src'];
  $type = isset($_REQUEST['type']) ? htmlspecialchars($_REQUEST['type']) : '';
  $number = isset($_REQUEST['number']) ? htmlspecialchars($_REQUEST['number']) : '';
  $result = mysqli_query($conn,"SELECT * FROM img_count");//性能优化
  $id = isset($_REQUEST['id']) ? htmlspecialchars($_REQUEST['id']) : '';//轮播图

  while($row = mysqli_fetch_array($result))
  {
    if($type == 'news')
    {
      if(rename("../".$src,"../../upload-img/news_img/" . ($row['count'] + $number) . "." . "jpg"))
      {
        echo ($row['count'] + $number);
      }
      else{
        echo "FAIL";
      }
    }
    else if($type == 'movie'){
      if(rename("../".$src,"../../upload-img/movie_img/" . ($row['count'] + $number) . "." . "jpg"))
      {
        echo ($row['count'] + $number);
      }
      else
        echo "FAIL";
    }
    else if($type == 'novel'){
      if(rename("../".$src,"../../upload-img/novel_img/" . ($row['count'] + $number) . "." . "jpg"))
      {
        echo ($row['count'] + $number);
      }
      else
        echo $src;    
    }
    else if($type == 'comic'){
      if(rename("../".$src,"../../upload-img/comic_img/" . ($row['count'] + $number) . "." . "jpg"))
      {
        echo ($row['count'] + $number);
      }
      else
        echo "FAIL";      
    }
    else if($type == 'roundabout'){//轮播操作不需要多加载图片
      if(rename("../".$src,"../../upload-img/roundabout_img/" . ($row['count'] + $number) . "." . "jpg"))
      {
        $result2 = mysqli_query($conn,"SELECT * FROM roundabout WHERE id=".$id);//性能优化
        while($row2 = mysqli_fetch_array($result2))
        {
          unlink("../../upload-img/roundabout_img/".$row2['img_id'].".jpg");
        }
        echo ($row['count'] + $number);
        mysqli_query($conn,"UPDATE roundabout SET img_id=".($row['count'] + $number)." WHERE id=".$id);
        mysqli_query($conn,"UPDATE img_count SET COUNT = COUNT + " . $number); 
      }
      else
        echo "FAIL";      
    }    
  }

  mysqli_close($conn);
?>