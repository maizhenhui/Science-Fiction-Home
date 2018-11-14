<?php 
  include 'mysql_conf.php';

  $id = $_REQUEST['id'];
  $uid = isset($_REQUEST['uid']) ? htmlspecialchars($_REQUEST['uid']) : '';
  $content = isset($_REQUEST['content']) ? htmlspecialchars($_REQUEST['content']) : '';

  $result = mysqli_query($conn,"SELECT * FROM note_reply where reply_id like " . $id . " ORDER BY reply_floor DESC LIMIT 1");

  $stats = 0;

  while($row = mysqli_fetch_array($result))
  {
    if($row['reply_id'] == $id)
    {
      mysqli_query($conn,"INSERT INTO note_reply (reply_id, reply_uid, reply_time, reply_content, reply_floor) VALUES ('" . $id . "','" . $uid . "','" . date('y-m-d h:i:s',time()) . "','" . $content . "','" . ($row['reply_floor']+1) . "')");
      $stats = 1;
      break;
    }
  }
  if(!$stats){
     mysqli_query($conn,"INSERT INTO note_reply (reply_id, reply_uid, reply_time, reply_content, reply_floor) VALUES ('" . $id . "','" . $uid . "','" . date('y-m-d h:i:s',time()) . "','" . $content . "','1')");
  }
  mysqli_close($conn);
 ?>