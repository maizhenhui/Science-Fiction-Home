<?php
  //负责处理JS的后台处理工作
  include 'php_function.php';
  include 'mysql_conf.php';

  $function = isset($_REQUEST['function']) ? htmlspecialchars($_REQUEST['function']) : '';

  if($function == "find_title_by_id"){
    $id = $_REQUEST['id'];
    echo find_title_by_id($conn,$id);
  }
 ?>