<?php 
  include 'mysql_conf.php';
  include 'php_function.php';

  $id = $_REQUEST['id'];

  $result = mysqli_query($conn,"SELECT * FROM note_reply where reply_id like " . $id . " ORDER BY reply_floor DESC LIMIT 10");

  $i = 0;
  $data = array();

  while($row = mysqli_fetch_array($result))
  {
    $data[$i] = array('reply_id'=>$row['reply_id'],'reply_author'=>find_nickname_by_uid($conn,$row['reply_uid']),'author_uid'=>$row['reply_uid'],'reply_time'=>$row['reply_time'],'reply_content'=>$row['reply_content'],'reply_floor'=>$row['reply_floor'],'profile_id'=>find_profileid_by_uid($conn,$row['reply_uid']));
    $i++;
  }
  if($i)
    echo json_encode($data);
  else
    echo "EMPTY";
  
  mysqli_close($conn);
?>