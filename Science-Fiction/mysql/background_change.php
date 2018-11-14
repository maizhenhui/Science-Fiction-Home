<?php 
  include 'mysql_conf.php';

  $uid = isset($_REQUEST['uid']) ? htmlspecialchars($_REQUEST['uid']) : '';
  $background = isset($_REQUEST['background']) ? htmlspecialchars($_REQUEST['background']) : '';

  mysqli_query($conn,"update user set bg=".$background." where uid =".$uid);

  mysqli_close($conn);
?>