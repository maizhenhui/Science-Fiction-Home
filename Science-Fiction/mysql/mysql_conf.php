<?php 
  $conn = mysqli_connect("localhost","root","","myphp");
  if (!$conn)
  {
    die('Could not connect: ' . mysql_error());
  }

  mysqli_query($conn,"SET NAMES UTF8");
?>