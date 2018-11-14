<?php 
  include 'mysql_conf.php';

  $id = isset($_REQUEST['id']) ? htmlspecialchars($_REQUEST['id']) : '';

  $query = mysqli_query($conn,"SELECT * FROM news_data WHERE id like '".$id."'");

  $data = array();

  //$date=date_create($row['time']);
  //echo date_format($date,"Y/m/d H:i:s");

  $row = mysqli_fetch_array($query);
  echo json_encode(array('title'=>$row['title'],'time'=>$row['time'],'content'=>$row['content'],'img_id'=>$row['img_id']));

  mysqli_close($conn);  
?>