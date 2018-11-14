<?php 
  include 'mysql_conf.php';

  $type = isset($_REQUEST['type']) ? htmlspecialchars($_REQUEST['type']) : '';
  $page = isset($_REQUEST['page']) ? htmlspecialchars($_REQUEST['page']) : '';
  $max_data_num = isset($_REQUEST['max_data_num']) ? htmlspecialchars($_REQUEST['max_data_num']) : '';  

  $result = mysqli_query($conn,"SELECT count(*) FROM ".$type."_data");
  while($row = mysqli_fetch_array($result))
  {
    echo ceil($row['count(*)']/$max_data_num);
  }
?>