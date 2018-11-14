<?php 
  include 'mysql_conf.php';
  
  //$image_id = mysqli_query($conn,"SELECT * FROM user where uid like '" . $_POST['uid'] . "' LIMIT 1");//性能优化
  $image_id = mysqli_query($conn,"SELECT * FROM profile_count");//性能优化
  $result = mysqli_query($conn,"SELECT * FROM user where uid like '" . $_POST['uid'] . "' LIMIT 1");//性能优化

  if ($_SERVER['REQUEST_METHOD'] == 'POST')
  {
    $targ_w = $targ_h = 210;
    $jpeg_quality = 90;

    $src = "." . $_POST['src'];

    $temp = explode(".", $src);
    $extension = end($temp);
    if($extension == 'jpg')
      $img_r = imagecreatefromjpeg($src);//需要开启GD库
    else if($extension == 'png')
      $img_r = imagecreatefrompng($src);//需要开启GD库
    $dst_r = ImageCreateTrueColor( $targ_w, $targ_h );
    $user_pid = 0;

    imagecopyresampled($dst_r,$img_r,0,0,$_POST['x'],$_POST['y'],
    $targ_w,$targ_h,$_POST['w'],$_POST['h']);

    header('Content-type: image/jpeg');

    while($row1 = mysqli_fetch_array($result))
    {
      if($row1['profile_id'] != -1)
      {
        unlink("../user-profile/".$row1['profile_id'].".jpg");
        $user_pid = $row1['profile_id'];
      }
    }

    while($row = mysqli_fetch_array($image_id))
    {
        if(imagejpeg($dst_r,"../user-profile/".$row['id'].".jpg",$jpeg_quality))
        {
          unlink($src);
          mysqli_query($conn,"UPDATE user SET profile_id = '".$row['id']."' where uid like '" . $_POST['uid'] ."'");
          //echo $_POST['src'] . " " . $_POST['w'] . " " .$_POST['h'] . " " .$_POST['x'] . " " .$_POST['y'];
          $pid = $row['id'] + 1;
          mysqli_query($conn,"UPDATE profile_count SET id = '".$pid."'");
          echo $row['id'];
        }
        else{
          echo 'FAIL';
        }
    }
  }
  mysqli_close($conn);
 ?>