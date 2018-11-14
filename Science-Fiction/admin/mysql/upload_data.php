<?php 
  include '../../mysql/mysql_conf.php';

  date_default_timezone_set('PRC'); 

  $title = isset($_REQUEST['title']) ? htmlspecialchars($_REQUEST['title']) : '';
  $content = isset($_REQUEST['content']) ? htmlspecialchars($_REQUEST['content']) : '';
  $img_id = isset($_REQUEST['img_id']) ? htmlspecialchars($_REQUEST['img_id']) : '';
  $type = isset($_REQUEST['type']) ? htmlspecialchars($_REQUEST['type']) : '';
  $number = isset($_REQUEST['number']) ? htmlspecialchars($_REQUEST['number']) : '';

  $query = mysqli_query($conn,"SHOW TABLE STATUS WHERE NAME='".$type."_data'");
  if($type != 'news')
    mysqli_query($conn,"INSERT INTO ".$type."_data (title,content,img_id) VALUES ('" . $title . "','" . $content . "','" . $img_id . "')");
  else
    mysqli_query($conn,"INSERT INTO ".$type."_data (title,content,time,img_id) VALUES ('" . $title . "','" . $content . "','" . date("Y-m-d h:i:s") . "','" . $img_id . "')");
  $res = mysqli_fetch_array($query);
  echo $res['Auto_increment']; 

  mysqli_query($conn,"UPDATE img_count SET COUNT = COUNT + " . $number);    

  mysqli_close($conn);
?>