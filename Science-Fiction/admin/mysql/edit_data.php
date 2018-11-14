<?php 
  include '../../mysql/mysql_conf.php';

  $id = isset($_REQUEST['id']) ? htmlspecialchars($_REQUEST['id']) : '';
  $title = isset($_REQUEST['title']) ? htmlspecialchars($_REQUEST['title']) : '';
  $content = isset($_REQUEST['content']) ? htmlspecialchars($_REQUEST['content']) : '';
  $img_id = isset($_REQUEST['img_id']) ? htmlspecialchars($_REQUEST['img_id']) : '';
  $type = isset($_REQUEST['type']) ? htmlspecialchars($_REQUEST['type']) : '';
  $number = isset($_REQUEST['number']) ? htmlspecialchars($_REQUEST['number']) : '';

  if($type == 'news'){
    $result = mysqli_query($conn,"SELECT * FROM news_data WHERE id=".$id);//性能优化
    while($row = mysqli_fetch_array($result))
    {
      $div_imgid = explode( ',' , $row['img_id']);
      for($i = 0;$i<count($div_imgid);$i++)
      {
        unlink("../../upload-img/news_img/".$div_imgid[$i].".jpg");
      }
    }

    $query = mysqli_query($conn,"SHOW TABLE STATUS WHERE NAME='news_data'");
    mysqli_query($conn,"UPDATE news_data SET title='".$title."',content='".$content."',img_id='".$img_id."' WHERE id=".$id);
  }
  else if($type == 'movie'){
    $result = mysqli_query($conn,"SELECT * FROM movie_data WHERE id=".$id);//性能优化
    while($row = mysqli_fetch_array($result))
    {
      $div_imgid = explode( ',' , $row['img_id']);
      for($i = 0;$i<count($div_imgid);$i++)
      {
        unlink("../../upload-img/movie_img/".$div_imgid[$i].".jpg");
      }
    }

    $query = mysqli_query($conn,"SHOW TABLE STATUS WHERE NAME='movie_data'");
    mysqli_query($conn,"UPDATE movie_data SET title='".$title."',content='".$content."',img_id='".$img_id."' WHERE id=".$id);
  }
  else if($type == 'novel'){
    $result = mysqli_query($conn,"SELECT * FROM novel_data WHERE id=".$id);//性能优化
    while($row = mysqli_fetch_array($result))
    {
      $div_imgid = explode( ',' , $row['img_id']);
      for($i = 0;$i<count($div_imgid);$i++)
      {
        unlink("../../upload-img/novel_img/".$div_imgid[$i].".jpg");
      }
    }

    $query = mysqli_query($conn,"SHOW TABLE STATUS WHERE NAME='novel_data'");
    mysqli_query($conn,"UPDATE novel_data SET title='".$title."',content='".$content."',img_id='".$img_id."' WHERE id=".$id);
  }
  else if($type == 'comic'){
    $result = mysqli_query($conn,"SELECT * FROM comic_data WHERE id=".$id);//性能优化
    while($row = mysqli_fetch_array($result))
    {
      $div_imgid = explode( ',' , $row['img_id']);
      for($i = 0;$i<count($div_imgid);$i++)
      {
        unlink("../../upload-img/comic_img/".$div_imgid[$i].".jpg");
      }
    }

    $query = mysqli_query($conn,"SHOW TABLE STATUS WHERE NAME='comic_data'"); 
    mysqli_query($conn,"UPDATE comic_data SET title='".$title."',content='".$content."',img_id='".$img_id."' WHERE id=".$id);
  }    

  $res = mysqli_fetch_array($query);
  echo $res['Auto_increment']; 

  mysqli_query($conn,"UPDATE img_count SET COUNT = COUNT + " . $number);    

  mysqli_close($conn);
?>