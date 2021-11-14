<?php
//header('content-type:application/json;charset=utf8');
header("content-Type: text/html; charset=gb2312");
$serverName = "localhost";//服务器的名字，本地localhost
$connectionInfo = array( "Database"=>"myweb", "UID"=>"cfydzl", "PWD"=>"123506467");
$conn = sqlsrv_connect( $serverName, $connectionInfo);
//获取前端操作指令
$opt=$_POST["opt"];
//$opt="finduser";
//登录状态
if (strcmp($opt,"state")==0)
{
    $username=$_POST["username"];
    $password=$_POST["password"];
    $sql = "select *from INFORMATION where (USERNAME='$username' and PASSWORD='$password')";
    $stmt = sqlsrv_query( $conn, $sql);
    $obj = sqlsrv_has_rows( $stmt);
    if ($obj==1)
    {
        $sql = "select *from INFORMATION where (USERNAME='$username' and PASSWORD='$password')";
        $stmt = sqlsrv_query( $conn, $sql);
        $obj = sqlsrv_fetch_object( $stmt);
        if ($obj->MANAGEMENT==1)
        {
            echo ('{num:"2"}');
        }else
        {
            echo ('{num:"1"}');
        }
    }else
    {
        echo ('{num:"0"}');
    }

}
//登录
elseif (strcmp($opt,"finduser")==0)
{
    $username=$_POST["username"];
    $password=$_POST["password"];
    $sql = "select *from INFORMATION where (USERNAME='$username' and PASSWORD='$password')";
    $stmt = sqlsrv_query( $conn, $sql);
    $obj = sqlsrv_has_rows( $stmt);
    if ($obj==true)
    {
        $sql = "select *from INFORMATION where (USERNAME='$username' and PASSWORD='$password')";
        $stmt = sqlsrv_query( $conn, $sql);
        $obj = sqlsrv_fetch_object( $stmt);
        if ($obj->MANAGEMENT==1)
        {
            echo ('{num:"2"}');
        }else
        {
            echo('{num:"1"}');
        }
    }else
    {
        echo ('{num:"0"}');
    }
}
//注册
elseif (strcmp($opt,"login")==0)
{
    $username=$_POST["username"];
    $password=$_POST["password"];
    $sql = "select *from INFORMATION where (USERNAME='$username')";
    $stmt = sqlsrv_query( $conn, $sql);
    $obj = sqlsrv_has_rows( $stmt);
    if ($obj==true)
    {
        echo('{num:"0"}');
    }else
    {
        $sql="insert into INFORMATION values ('$username','$password','','','',0)";
        $stmt = sqlsrv_query( $conn, $sql);
        $sql="select *from INFORMATION where (USERNAME='$username' and PASSWORD='$password ')";
        $stmt = sqlsrv_query( $conn, $sql);
        $obj = sqlsrv_has_rows( $stmt);
        if ($obj==true)
        {
            $json = '{
            "username": "'.$username.'",
            "password":"'.$password.'"
            }';
            echo('{num:"1"}');
        }else
        {
            echo('{num:"0"}');
        }
    }
}