<?php 
  include 'mysql_conf.php';

  $content = isset($_REQUEST['content']) ? htmlspecialchars($_REQUEST['content']) : '';
  $max_data_num = isset($_REQUEST['max_data_num']) ? htmlspecialchars($_REQUEST['max_data_num']) : '';
  
  $result = mysqli_query($conn,"SELECT sum(tmpcount) FROM (SELECT COUNT(*) AS tmpcount FROM news_data where title like \"%".$content."%\" UNION ALL 
  SELECT COUNT(*) AS tmpcount FROM novel_data WHERE title LIKE \"%".$content."%\" UNION ALL 
  SELECT COUNT(*) AS tmpcount FROM comic_data WHERE title LIKE \"%".$content."%\" UNION ALL 
  SELECT COUNT(*) AS tmpcount FROM note_data WHERE title LIKE \"%".$content."%\")a");

  if($row = mysqli_fetch_array($result))
  { 
     echo ceil($row['sum(tmpcount)']/$max_data_num);
  }

  mysqli_close($conn);    
?>