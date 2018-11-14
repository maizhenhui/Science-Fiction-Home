<?php 
  include '../../mysql/mysql_conf.php';

  $id = isset($_REQUEST['id']) ? htmlspecialchars($_REQUEST['id']) : '';
  $type = isset($_REQUEST['type']) ? htmlspecialchars($_REQUEST['type']) : '';

  $i = 0;
  $data = array();
  $div_str = 0;

  switch ($type) {
    case 'comic':{
      $result = mysqli_query($conn,"SELECT * FROM comic_data where id='".$id."'");
      while($row = mysqli_fetch_array($result))
      {
        $div_str = explode( ',' , $row['img_id']);
        for($i = 0;$i<count($div_str);$i++)
        {
          unlink("../../upload-img/comic_img/".$div_str[$i].".jpg");
        }
      }
      mysqli_query($conn,"DELETE FROM comic_data where id='".$id."'");
      break;
    }
    case 'movie':{
      $result = mysqli_query($conn,"SELECT * FROM movie_data where id='".$id."'");
      while($row = mysqli_fetch_array($result))
      {
        $div_str = explode( ',' , $row['img_id']);
        for($i = 0;$i<count($div_str);$i++)
        {
          unlink("../../upload-img/movie_img/".$div_str[$i].".jpg");
        }
      }
      mysqli_query($conn,"DELETE FROM movie_data where id='".$id."'");
      break;
    }
    case 'novel':{
      $result = mysqli_query($conn,"SELECT * FROM novel_data where id='".$id."'");
      while($row = mysqli_fetch_array($result))
      {
        $div_str = explode( ',' , $row['img_id']);
        for($i = 0;$i<count($div_str);$i++)
        {
          unlink("../../upload-img/novel_img/".$div_str[$i].".jpg");
        }
      }
      mysqli_query($conn,"DELETE FROM novel_data where id='".$id."'");
      break;
    }
    case 'news':{
      $result = mysqli_query($conn,"SELECT * FROM news_data where id='".$id."'");
      while($row = mysqli_fetch_array($result))
      {
        $div_str = explode( ',' , $row['img_id']);
        for($i = 0;$i<count($div_str);$i++)
        {
          unlink("../../upload-img/news_img/".$div_str[$i].".jpg");
        }
      }
      mysqli_query($conn,"DELETE FROM news_data where id='".$id."'");
      break;
    }
    case 'note':$result = mysqli_query($conn,"DELETE FROM note_data where id='".$id."'");break;
    default:break;
  }

  echo "<script>";
  echo "window.location.href='../list-edit.html?refresh_type=".$type."'";
  echo "</script>";

  mysqli_close($conn);
?>