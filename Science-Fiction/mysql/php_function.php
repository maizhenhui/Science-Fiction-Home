<?php 
  function control_space_str($str,$number){//控制占位,防止表单溢出
    $space = 0;
    $GOD = 0;
    $sub_str = mb_substr($str,0,$number,'UTF8');//无论中英文，先截取number个

    for($i = 0;$i<$number; $i++){
      $re=mb_substr($sub_str,$i,1,'UTF8');//截取单个字符
      //一个汉字占2个位置，英文占1个
      if(strlen($re) == 3)//计算单个字符的字节数
      {
        $space += 2;
        $GOD ++;
      }
      else{
        $space ++;
        $GOD ++;
      }
      if($space >= $number) break;//单占用位置达到number时
    }
    return mb_substr($str,0,$GOD,'UTF8') . "...";
  }

  function find_uid_by_username($conn,$username){
    $query = mysqli_query($conn,"SELECT * FROM user where username like '" . $username . "'");
    $row = mysqli_fetch_array($query);
    return $row['uid'];
  }

  function find_username_by_uid($conn,$uid){
    $query = mysqli_query($conn,"SELECT * FROM user where uid like '" . $uid . "'");
    $row = mysqli_fetch_array($query);
    return $row['username'];
  }  

  function find_nickname_by_uid($conn,$uid){
    $query = mysqli_query($conn,"SELECT * FROM user where uid like '" . $uid . "'");
    $row = mysqli_fetch_array($query);
    return $row['nickname'];
  }    

  function find_profileid_by_uid($conn,$uid){
    $query = mysqli_query($conn,"SELECT * FROM user where uid like '" . $uid . "'");
    $row = mysqli_fetch_array($query);
    return $row['profile_id'];
  }  

  function find_title_by_id($conn,$id){
    $query = mysqli_query($conn,"SELECT * FROM note_data where id like '" . $id . "'");    
    $row = mysqli_fetch_array($query);
    echo control_space_str($row['title'],10);
  }
?>