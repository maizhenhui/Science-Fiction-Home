<?php 
  include '../../mysql/mysql_conf.php';
  include '../../mysql/php_function.php';

  $type = isset($_REQUEST['type']) ? htmlspecialchars($_REQUEST['type']) : '';

  $i = 0;
  $data = array();
  $sub_title = array();
  $result = mysqli_query($conn,"SELECT * FROM popular_show WHERE type='".$type."'");

  while($row = mysqli_fetch_array($result))
  {
    $result2 = mysqli_query($conn,"SELECT * FROM ". $type ."_data WHERE id='".$row['page_id']."'");

    $data[$i] = array('id'=>$row['page_id'],'title'=>"NULL",'rank'=>$row['rank']);//清零处理

    while($row2 = mysqli_fetch_array($result2))
    {
      if(((strlen($row2['title']) + mb_strlen($row2['title'],'UTF8')) / 2) < 26)
        $sub_title = $row2['title'];
      else
        $sub_title = control_space_str($row2['title'],26);     

      $data[$i] = array('id'=>$row['page_id'],'title'=>$sub_title,'rank'=>$row['rank']);
    }
    $i++;
  }    

  echo json_encode($data);

  mysqli_close($conn);
 ?>