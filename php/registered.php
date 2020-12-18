<?php

// 允许任何来源
header("Access-Control-Allow-Origin:*"); 

// 设置响应头信息
header('Content-Type:text/html;charset=utf-8');

$user = $_POST['user'];
$pass = $_POST['pass'];
$type = $_POST['type'];

// 连接数据库
$link = mysqli_connect('localhost','root','','qqq');
if (!$link) {
  die('{"err":-1,"msg":"连接失败"}');
}

// 控制判断
if (!$user || !$pass || !$type) {
  die('{"err":-2,"msg":"参数错误"}');
} else {

  
  // 注册
  if ($type === 'add') {
    // 先查询注册的账号是否已存在
    $query_sql = "select * from user where name='$user'";
    $query_res = mysqli_query($link,$query_sql);
    $query_arr = mysqli_fetch_all($query_res,1);
    if (count($query_arr) > 0) {
      echo '{"err":-4,"msg":"账号已被占用"}';
    } else {
      // 可以注册，插入数据
      $insert_sql = "insert into user(name,pass) values('$user','$pass')";
      mysqli_query($link,$insert_sql);
      $num = mysqli_affected_rows($link);
      if ($num > 0){
        echo '{"err":1,"msg":"注册成功"}';
      } else {
        echo '{"err":-5,"msg":"注册失败"}';
      }
    }
  }

}
// 关闭连接
mysqli_close($link);
?>