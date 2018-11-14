<?php
  include 'mysql_conf.php';
  include 'php_function.php';

  $id = $_REQUEST['id'];

  $query = mysqli_query($conn,"SELECT * FROM note_data where id like '" . $id . "'");

  $stats = 0;

  $row = mysqli_fetch_array($query);
  echo json_encode(array('id'=>$row['id'],'title'=>$row['title'],'author'=>find_nickname_by_uid($conn,$row['uid']),'uid'=>$row['uid'],'content'=>$row['content'],'time'=>$row['time']));

  mysqli_close($conn);
?>