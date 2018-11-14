<?php 
  include 'mysql_conf.php';

  $query = mysqli_query($conn,"SELECT * FROM popular_show WHERE rank <= 30");

  $i = 0;
  $data = array();

  while($row = mysqli_fetch_array($query))
  {
    $query2 = mysqli_query($conn,"SELECT * FROM ".$row['type']."_data where id = '".$row['page_id']."'");
    $row2 = mysqli_fetch_array($query2);
    $data[$i] = array('type'=>$row['type'],'rank'=>$row['rank'],'page_id'=>$row['page_id'],'title'=>$row2['title']); 
    $i++;
  } 

  echo json_encode($data);
  mysqli_close($conn);
?>