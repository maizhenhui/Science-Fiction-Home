<?php 
  include '../../mysql/mysql_conf.php';

  $type = isset($_REQUEST['type']) ? htmlspecialchars($_REQUEST['type']) : '';
  $max_data_num = isset($_REQUEST['max_data_num']) ? htmlspecialchars($_REQUEST['max_data_num']) : '';

  $qid = mysqli_query($conn,"select count(*) as total from ".$type."_data");
  $res = mysqli_fetch_array($qid);
  echo ceil($res['total']/$max_data_num);  

  mysqli_close($conn);
?>