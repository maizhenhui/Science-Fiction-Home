<?php 
  include 'mysql_conf.php';

  $uid = isset($_REQUEST['uid']) ? htmlspecialchars($_REQUEST['uid']) : '';
  $title = isset($_REQUEST['title']) ? htmlspecialchars($_REQUEST['title']) : '';
  $content = isset($_REQUEST['content']) ? htmlspecialchars($_REQUEST['content']) : '';

  $query = mysqli_query($conn,"SHOW TABLE STATUS WHERE NAME='note_data'");
  $res = mysqli_fetch_array($query);
  echo $res['Auto_increment'];;

  mysqli_query($conn,"INSERT INTO note_data (uid,time , title, content) VALUES ('" . $uid . "','" . date('y-m-d h:i:s',time()) . "','" . $title . "','" . $content . "')");

  mysqli_close($conn);
 ?>