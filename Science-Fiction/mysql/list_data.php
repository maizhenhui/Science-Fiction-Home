<?php 
  include 'mysql_conf.php';
  include 'php_function.php';  

  $type = isset($_REQUEST['type']) ? htmlspecialchars($_REQUEST['type']) : '';
  $page = isset($_REQUEST['page']) ? htmlspecialchars($_REQUEST['page']) : '';
  $max_data_num = isset($_REQUEST['max_data_num']) ? htmlspecialchars($_REQUEST['max_data_num']) : '';

  $i = 0;
  $data = array();
  
  if($type == 'comic'){
    $result = mysqli_query($conn,"SELECT * FROM ".$type."_data limit ".(($page-1)*$max_data_num).",".$max_data_num."");
    while($row = mysqli_fetch_array($result))
    {
      $data[$i] = array('id'=>$row['id'],'title'=>$row['title'],'img_id'=>$row['img_id']);
      $i++;     
    }       
  }
  else if($type == 'novel'){
    $result = mysqli_query($conn,"SELECT * FROM ".$type."_data limit ".(($page-1)*$max_data_num).",".$max_data_num."");
    while($row = mysqli_fetch_array($result))
    {
      $data[$i] = array('id'=>$row['id'],'title'=>$row['title'],'img_id'=>$row['img_id']);
      $i++;     
    }       
  }  
  else if($type == 'news')
  {
    $result = mysqli_query($conn,"SELECT * FROM ".$type."_data limit ".(($page-1)*$max_data_num).",".$max_data_num."");

    while($row = mysqli_fetch_array($result))
    {
      if(((strlen($row['title']) + mb_strlen($row['title'],'UTF8')) / 2) < 40)
        $sub_title = $row['title'];
      else
        $sub_title = control_space_str($row['title'],40);

      if(((strlen($row['content']) + mb_strlen($row['content'],'UTF8')) / 2) < 135)
        $sub_content = $row['content'];
      else
        $sub_content = control_space_str($row['content'],135);      

      $data[$i] = array('id'=>$row['id'],'title'=>$sub_title,'content'=>$sub_content,'time'=>$row['time'],'img_id'=>$row['img_id']);
      $i++;     
    }   
  }
  else if($type == 'movie')
  {
    $result = mysqli_query($conn,"SELECT * FROM ".$type."_data limit ".(($page-1)*$max_data_num).",".$max_data_num."");

    while($row = mysqli_fetch_array($result))
    {
      if(((strlen($row['title']) + mb_strlen($row['title'],'UTF8')) / 2) < 40)
        $sub_title = $row['title'];
      else
        $sub_title = control_space_str($row['title'],40);

      if(((strlen($row['content']) + mb_strlen($row['content'],'UTF8')) / 2) < 450)
        $sub_content = $row['content'];
      else
        $sub_content = control_space_str($row['content'],450);      

      $data[$i] = array('id'=>$row['id'],'title'=>$sub_title,'content'=>$sub_content,'img_id'=>$row['img_id']);
      $i++;     
    }   
  }        
  else if($type == 'note')
  {
    $result = mysqli_query($conn,"SELECT note_data.id,note_data.title,note_data.content,note_data.time,note_data.uid,user.nickname,user.profile_id FROM ".$type."_data INNER JOIN USER ON note_data.uid = user.uid limit ".(($page-1)*$max_data_num).",".$max_data_num."");
    while($row = mysqli_fetch_array($result))
    {
      $data[$i] = array('id'=>$row['id'],'title'=>$row['title'],'content'=>$row['content'],'time'=>$row['time'],'uid'=>$row['uid'],'nickname'=>$row['nickname'],'profile_id'=>$row['profile_id']);
      $i++;     
    }   
  } 

  echo json_encode($data);

  mysqli_close($conn);
 ?>