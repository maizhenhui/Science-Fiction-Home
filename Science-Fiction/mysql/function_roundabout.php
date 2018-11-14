<?php 
  include 'php_function.php';
  include 'mysql_conf.php';

  $query = mysqli_query($conn,"SELECT * FROM roundabout");

  $i = 0;
  $data = array();

  while($row = mysqli_fetch_array($query))
  {
    $query2 = mysqli_query($conn,"SELECT * FROM news_data where id like '" . $row['news_id'] . "'");
    $row2 = mysqli_fetch_array($query2);
    $data[$i] = array('id'=>$row['id'],'img_id'=>$row['img_id'],'title'=>$row2['title'],'news_id'=>$row['news_id']);
    $i++;
  } 
  echo json_encode($data);
  mysqli_close($conn);
?>