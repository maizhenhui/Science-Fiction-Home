<?php
  include 'mysql_conf.php';

  $username = isset($_REQUEST['username']) ? htmlspecialchars($_REQUEST['username']) : '';
  $password = isset($_REQUEST['password']) ? htmlspecialchars($_REQUEST['password']) : '';

  $result = mysqli_query($conn,"SELECT * FROM user where username like '" . $username . "' LIMIT 1");

  $stats = 1;

  while($row = mysqli_fetch_array($result))
  {
    if($row['username'] == $username && $row['password'] == $password){
      echo json_encode(array('uid'=>$row['uid'],'pid'=>$row['profile_id'],'nickname'=>$row['nickname'],'isadmin'=>$row['isadmin'],'bg'=>$row['bg']));//返回用户ID
      $stats = 0;
      continue;
    }
  }
  if($stats == 1){
    echo "FAILED";
  }

  mysqli_close($conn);
?>