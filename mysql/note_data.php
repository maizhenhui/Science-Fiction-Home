<?php 
  include 'mysql_conf.php';
  include 'php_function.php';

  $result = mysqli_query($conn,"SELECT * FROM note_data ORDER BY TIME DESC limit 10");

  $i = 0;
  $data = array();

  while($row = mysqli_fetch_array($result))
  {
    if(((strlen($row['title']) + mb_strlen($row['title'],'UTF8')) / 2) < 26)
      $sub_title = $row['title'];
    else
      $sub_title = control_space_str($row['title'],26);

    if(((strlen($row['content']) + mb_strlen($row['content'],'UTF8')) / 2) < 26)
      $sub_content = $row['content'];
    else
      $sub_content = control_space_str($row['content'],26);

    $data[$i] = array('id'=>$row['id'],'author'=>find_nickname_by_uid($conn,$row['uid']),'time'=>$row['time'],'title'=>$sub_title,'content'=>$sub_content,'uid'=>$row['uid']);
    $i++;
  }

  echo json_encode($data);

  mysqli_close($conn);
?>