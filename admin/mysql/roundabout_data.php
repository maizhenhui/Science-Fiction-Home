<?php 
  include '../../mysql/mysql_conf.php';
  include '../../mysql/php_function.php';

  $i = 0;
  $data = array();
  $sub_title = array();
  $result = mysqli_query($conn,"SELECT * FROM roundabout");

  while($row = mysqli_fetch_array($result))
  {
    $result2 = mysqli_query($conn,"SELECT * FROM news_data WHERE id='".$row['news_id']."'");

    $data[$i] = array('id'=>$row['id'],'img_id'=>$row['img_id'],'title'=>"NULL",'news_id'=>$row['news_id']);//清零处理

    while($row2 = mysqli_fetch_array($result2))
    {
      if(((strlen($row2['title']) + mb_strlen($row2['title'],'UTF8')) / 2) < 80)
        $sub_title = $row2['title'];
      else
        $sub_title = control_space_str($row2['title'],80);     

      $data[$i] = array('id'=>$row['id'],'img_id'=>$row['img_id'],'title'=>$sub_title,'news_id'=>$row['news_id']);
    }
    $i++;
  }    

  echo json_encode($data);

  mysqli_close($conn);
 ?>