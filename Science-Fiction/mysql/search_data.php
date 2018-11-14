<?php 
  include 'mysql_conf.php';

  $content = isset($_REQUEST['content']) ? htmlspecialchars($_REQUEST['content']) : '';
  $page = isset($_REQUEST['page']) ? htmlspecialchars($_REQUEST['page']) : '1';
  $max_data_num = isset($_REQUEST['max_data_num']) ? htmlspecialchars($_REQUEST['max_data_num']) : '';

  $i = 0;
  $data = array();
  
  $result = mysqli_query($conn,"SELECT id,title,'news' AS 'type' FROM news_data where title like \"%".$content."%\" UNION ALL 
  SELECT id,title,'novel' AS 'type' FROM novel_data WHERE title LIKE \"%".$content."%\" UNION ALL 
  SELECT id,title,'comic' AS 'type' FROM comic_data WHERE title LIKE \"%".$content."%\" UNION ALL 
  SELECT id,title,'note' AS 'type' FROM note_data WHERE title LIKE \"%".$content."%\" 
  limit ".(($page-1)*$max_data_num).",".$max_data_num."");

  while($row = mysqli_fetch_array($result))
  { 
    $data[$i] = array('id'=>$row['id'],'title'=>$row['title'],'type'=>$row['type']);
    $i++;
  }
  echo json_encode($data);

  mysqli_close($conn);  
?>