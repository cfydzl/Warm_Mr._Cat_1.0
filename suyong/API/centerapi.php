<?php
//header('content-type:application/json;charset=utf8');
header("content-Type: text/html; charset=gb2312");
//服务器
$serverName = "localhost";//服务器的名字，本地localhost
$connectionInfo = array( "Database"=>"myweb", "UID"=>"cfydzl", "PWD"=>"123506467");
$conn = sqlsrv_connect( $serverName, $connectionInfo);
//获取前端操作指令
$opt=$_POST["opt"];
//$opt="password";
//登录状态
if (strcmp($opt,"state")==0)
{

    $username=$_POST["username"];
    $password=$_POST["password"];
    $sql = "select *from INFORMATION where (USERNAME='$username' and PASSWORD='$password')";
    $stmt = sqlsrv_query( $conn, $sql);
    $obj = sqlsrv_has_rows( $stmt);
    echo ('{num:"'.$obj.'"}');
}
//个人信息
elseif (strcmp($opt,"information")==0)
{
    $username=$_POST["username"];
    $password=$_POST["password"];
    $sql = "select *from INFORMATION where (USERNAME='$username' and PASSWORD='$password')";
    $stmt = sqlsrv_query( $conn, $sql);
    $obj = sqlsrv_fetch_object( $stmt);
    $json = '{
            "USERNAME": "'.trim($obj->USERNAME).'",
            "PASSWORD":"'.trim($obj->PASSWORD).'",
            "NAME":"'.trim($obj->NAME).'",
            "PHONE":"'.trim($obj->PHONE).'",
            "ADDRESS":"'.trim($obj->ADDRESS).'"
        }';
    echo ($json);
}
//密码
elseif(strcmp($opt,"password")==0)
{
    $text=$_POST["text"];
    $username=$_POST["username"];
    $password=$_POST["password"];
    $sql = "update INFORMATION set PASSWORD='$text' where ( USERNAME='$username')";
    $stmt = sqlsrv_query( $conn, $sql);
    $obj = sqlsrv_rows_affected($stmt);
    if ($obj==1)
    {
        $json = '{
            "username": "'.$username.'",
            "password":"'.$text.'"
        }';
        file_put_contents("D:\wamp64\www\suyong\information\user.text", $json);
        echo ('{ctext:"'.$text.'"}');
    }else{
        echo ('{ctext:"0"}');
    }
}
//用户名
elseif (strcmp($opt,"username")==0)
{
    $text=$_POST["text"];
    $username=$_POST["username"];
    $password=$_POST["password"];
    $sql = "update INFORMATION set NAME='$text' where ( USERNAME='$username')";
    $stmt = sqlsrv_query( $conn, $sql);
    $obj = sqlsrv_rows_affected($stmt);
    if ($obj==1)
    {
        echo ('{ctext:"'.$text.'"}');
    }else{
        echo ('{ctext:"0"}');
    }
}
//联系方式
elseif (strcmp($opt,"phone")==0)
{
    $text=$_POST["text"];
    $username=$_POST["username"];
    $password=$_POST["password"];
    $sql = "update INFORMATION set PHONE='$text' where ( USERNAME='$username')";
    $stmt = sqlsrv_query( $conn, $sql);
    $obj = sqlsrv_rows_affected($stmt);
    if ($obj==1)
    {
        echo ('{ctext:"'.$text.'"}');
    }else{
        echo ('{ctext:"0"}');
    }
}
//地址
elseif (strcmp($opt,"address")==0)
{
    $text=$_POST["text"];
    $username=$_POST["username"];
    $password=$_POST["password"];
    $sql = "update INFORMATION set ADDRESS='$text' where ( USERNAME='$username')";
    $stmt = sqlsrv_query( $conn, $sql);
    $obj = sqlsrv_rows_affected($stmt);
    if ($obj==1)
    {
        echo ('{ctext:"'.$text.'"}');
    }else{
        echo ('{ctext:"0"}');
    }
}