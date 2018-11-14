<?php 
  include '../../mysql/mysql_conf.php';
  include '../../mysql/php_function.php';

  $type = isset($_REQUEST['type']) ? htmlspecialchars($_REQUEST['type']) : '';
  $arr_id = $_REQUEST['arr_id'];
  $rank = 0;

  switch ($type) {
    case 'movie':$rank=1;break;
    case 'novel':$rank=11;break;
    case 'comic':$rank=21;break;
    default:break;
  }

  for($i = 0;$i<10;$i++)
  {
    mysqli_query($conn,"UPDATE popular_show SET page_id=".$arr_id[$i]." WHERE rank=".$rank);
    echo $rank."|";
    echo $arr_id[$i]."next";
    $rank = $rank + 1;
  }

  mysqli_close($conn);
 ?>  