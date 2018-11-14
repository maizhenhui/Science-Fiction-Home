<?php 
  include '../../mysql/mysql_conf.php';
  include '../../mysql/php_function.php';

  $type = isset($_REQUEST['type']) ? htmlspecialchars($_REQUEST['type']) : '';
  $page = isset($_REQUEST['page']) ? htmlspecialchars($_REQUEST['page']) : '';
  $max_data_num = isset($_REQUEST['max_data_num']) ? htmlspecialchars($_REQUEST['max_data_num']) : '';

  $i = 0;
  $data = array();

  $result = mysqli_query($conn,"SELECT * FROM ".$type."_data limit ".(($page-1)*$max_data_num).",".$max_data_num."");

  while($row = mysqli_fetch_array($result))
  {
    $data[$i] = array('id'=>$row['id'],'title'=>'空');

    if(((strlen($row['title']) + mb_strlen($row['title'],'UTF8')) / 2) < 26)
      $sub_title = $row['title'];
    else
      $sub_title = control_space_str($row['title'],26);
          
    if($sub_title)
      $data[$i] = array('id'=>$row['id'],'title'=>$sub_title);
    $i++;
  }    

  echo json_encode($data);

  mysqli_close($conn);
?>