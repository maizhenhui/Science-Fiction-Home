<?php
  include 'php_function.php';
  include 'mysql_conf.php';

  $username = isset($_REQUEST['username']) ? htmlspecialchars($_REQUEST['username']) : '';
  $password = isset($_REQUEST['password']) ? htmlspecialchars($_REQUEST['password']) : '';
  $sex = isset($_REQUEST['sex']) ? htmlspecialchars($_REQUEST['sex']) : '';

  $result = mysqli_query($conn,"SELECT * FROM user where username like '" . $username . "' LIMIT 1");//性能优化
  $stats = 0;

  //关于时间复杂度，可以采用
  //SELECT * FROM USER WHERE username LIKE 'root1'语句减少循环次数
  //普通循环为O(n)+O(n),SQL检索搜索也为O(n),减少性能使用
  while($row = mysqli_fetch_array($result))
  {
    if($row['username'] == $username){
      echo "REGISTERED";
      $stats = 1;
      break;
    }    
  }
  if($stats == 0){
      mysqli_query($conn,"INSERT INTO user (username,password,sex,profile_id) VALUES ('" . $username . "','" . $password . "','" . $sex . "','" . -1 . "')");
      echo json_encode(array('uid'=>find_uid_by_username($conn,$username),'pid'=>'-1'));
  }

  mysqli_close($conn);
?>