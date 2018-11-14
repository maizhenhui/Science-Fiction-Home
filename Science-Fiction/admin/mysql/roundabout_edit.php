<?php 
  include '../../mysql/mysql_conf.php';
  include '../../mysql/php_function.php';

  $arr_id = $_REQUEST['arr_id'];

  for($i = 0;$i<5;$i++)
  {
    mysqli_query($conn,"UPDATE roundabout SET news_id=".$arr_id[$i]." WHERE id=".$i);
    echo $arr_id[$i]."|";
  }

  mysqli_close($conn);
 ?>  