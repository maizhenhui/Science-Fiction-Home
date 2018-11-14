<?php 
  include 'mysql_conf.php';

  $id = isset($_REQUEST['id']) ? htmlspecialchars($_REQUEST['id']) : '';
  $type = isset($_REQUEST['type']) ? htmlspecialchars($_REQUEST['type']) : '';

  $query = mysqli_query($conn,"SELECT * FROM ".$type."_data WHERE id like '".$id."'");    

  $i = 0;

  $row = mysqli_fetch_array($query);
  echo json_encode(array('title'=>$row['title'],'content'=>$row['content'],'img_id'=>$row['img_id']));

  mysqli_close($conn);  
?>