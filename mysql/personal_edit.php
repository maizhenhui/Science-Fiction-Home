<?php
  include 'mysql_conf.php';

  $uid = isset($_REQUEST['uid']) ? htmlspecialchars($_REQUEST['uid']) : '';
  $nickname = isset($_REQUEST['nickname']) ? htmlspecialchars($_REQUEST['nickname']) : '';
  $sign = isset($_REQUEST['sign']) ? htmlspecialchars($_REQUEST['sign']) : '';
  $sex = isset($_REQUEST['sex']) ? htmlspecialchars($_REQUEST['sex']) : '';
  $birthday = isset($_REQUEST['birthday']) ? htmlspecialchars($_REQUEST['birthday']) : '';

  $result = mysqli_query($conn,"SELECT * FROM user where uid like '" . $uid . "' LIMIT 1");//性能优化

  //关于时间复杂度，可以采用
  //SELECT * FROM USER WHERE username LIKE 'root1'语句减少循环次数
  //普通循环为O(n)+O(n),SQL检索搜索也为O(n),减少性能使用
  $row = mysqli_fetch_array($result);
  mysqli_query($conn,"UPDATE user SET nickname = '".$nickname."',sign = '".$sign."',sex = '".$sex."',birthday = '".$birthday."' WHERE uid = '".$uid."'");

  // $row = mysqli_fetch_array($image_id);
  // mysqli_query($conn,"UPDATE user SET profile_id = '".$row['profile_id']."' WHERE uid = '".$uid."'");

  echo "ojbk";

  mysqli_close($conn);
?>