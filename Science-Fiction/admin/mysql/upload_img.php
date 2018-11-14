<?php 
  if($_FILES['file']['error'] > 0)
    echo 'ERROR';
  else{
    if(file_exists("../../tmppic/" . $_FILES['file']['name'])){
      //echo json_encode(array('pic_url'=>"../tmppic/" . $_FILES['file']['name']));
      echo "../tmppic/" . $_FILES['file']['name'];
    }
    else{
      move_uploaded_file($_FILES['file']['tmp_name'],  "../../tmppic/" . $_FILES['file']['name']);
      //echo json_encode(array('pic_url'=>"../tmppic/" . $_FILES['file']['name']));
      echo "../tmppic/" . $_FILES['file']['name'];
    }
  }
?>