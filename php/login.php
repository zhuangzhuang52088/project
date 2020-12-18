<?php
header("content-type:text/html;charset=utf-8");
//获取参数
$u=$_GET['username'];
$p=$_GET['password'];
//连接数据库
$link=mysqli_connect('localhost','root','','qqq');
//设置编码
mysqli_set_charset($link,"utf8");
//SQL语句
$sql="select * from user where name='$u' and pass='$p'";
//执行SQL语句
$result=mysqli_query($link,$sql);

//判断结果集中的数据是否存在
if(mysqli_fetch_assoc($result)){
    echo 1;
}else{
    echo 0;
}
?>