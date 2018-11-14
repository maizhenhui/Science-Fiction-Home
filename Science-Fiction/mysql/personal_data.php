<?php
  include 'mysql_conf.php';

  $uid = isset($_REQUEST['uid']) ? htmlspecialchars($_REQUEST['uid']) : '';

  $query = mysqli_query($conn,"SELECT * FROM user where uid like '" . $uid . "'");

  $row = mysqli_fetch_array($query);
  echo json_encode(array('uid'=>$row['uid'],'username'=>$row['username'],'sex'=>$row['sex'],'nickname'=>$row['nickname'],'sign'=>$row['sign'],'birthday'=>$row['birthday'],'profile_id'=>$row['profile_id']));  

  mysqli_close($conn);
?>