<?php
//header('content-type:application/json;charset=utf8');
header("content-Type: text/html; charset=gb2312");
//服务器
$serverName = "localhost";//服务器的名字，本地localhost
$connectionInfo = array( "Database"=>"myweb", "UID"=>"cfydzl", "PWD"=>"123506467");
$conn = sqlsrv_connect( $serverName, $connectionInfo);
//获取前端操作指令
$opt=$_GET["opt"];
//$opt="password";
//统计图信息
if (strcmp($opt,"information")==0)
{
    $text=$_GET["text"];
    $sql = "select *from RESTAURANT where (NAME='$text')";
    $stmt = sqlsrv_query( $conn, $sql);
    $obj = sqlsrv_fetch_object( $stmt);
    $json = '{
        "NAME":"'.trim($obj->NAME).'",
        "NINE": '.$obj->NINE.',
        "ELEVEN": '.$obj->ELEVEN.',
        "THIRTEEN": '.$obj->THIRTEEN.',
        "FIFTEEN": '.$obj->FIFTEEN.',
        "SEVENTEEN": '.$obj->SEVENTEEN.',
        "NINETEEN": '.$obj->NINETEEN.'
    }';
    echo ($json);
}
//餐桌预定
elseif(strcmp($opt,"bookdesk")==0)
{
    $desk=$_GET["desk"];
    $time=$_GET["time"];
    $desktext=$_GET["desktext"];
    $timetext=$_GET["timetext"];
    $username=$_GET["username"];
    $password=$_GET["password"];
    $sql = "select *from RESTAURANT where NAME='$desk'";
    $stmt = sqlsrv_query( $conn, $sql);
    $obj = sqlsrv_fetch_object( $stmt);
    if ($obj->$time<=0)
    {
        echo ('{"num":0}');
    }else
    {
        $sql = "update RESTAURANT set $time=$time-1 where NAME='$desk'";
        $stmt = sqlsrv_query( $conn, $sql);
        $obj = sqlsrv_rows_affected($stmt);
        if ($obj==1)
        {
            $Y=date("Y");
            $M=date("m");
            $D=date("d");
            $sql="insert into BOOK_DESK values ('$username$Y$M$D','$username','$desktext','$timetext')";
            $stmt = sqlsrv_query( $conn, $sql);
            $obj = sqlsrv_rows_affected($stmt);
            if ($obj==1)
            {
                echo ('{"num":1}');
            }else
            {
                echo ('{"num":0}');
            }
        }else
        {
            echo ('{"num":0}');
        }
    }
}