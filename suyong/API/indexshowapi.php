<?php
//header('content-type:application/json;charset=utf8');
header("content-Type: text/html; charset=gb2312");
//服务器
$serverName = "localhost";//服务器的名字，本地localhost
$connectionInfo = array( "Database"=>"myweb", "UID"=>"cfydzl", "PWD"=>"123506467");
$conn = sqlsrv_connect( $serverName, $connectionInfo);
//获取前端操作指令
$opt=$_GET["opt"];
//$opt="commenttext";
//页面评论区个数
if (strcmp($opt,"findnum")==0)
{
    $sql = "select count(*)num from COMMENT";
    $stmt = sqlsrv_query( $conn, $sql);
    $obj = sqlsrv_fetch_object( $stmt);
    $json = json_encode(
        array(
            "num"=>$obj->num
        ),JSON_UNESCAPED_UNICODE);
    echo ($json);
}
//评论加载
else if(strcmp($opt,"commenttext")==0)
{
    $optnum=$_GET["optnum"];
//    $optnum=1;
    $frontnum=$optnum-1;
    $sql = "select top $optnum *from COMMENT where USERID not in (select top $frontnum USERID from COMMENT)";
    $stmt = sqlsrv_query( $conn, $sql);
    $obj = sqlsrv_fetch_object( $stmt);
    $a=$obj->TEXT;
    $json = '{
        "USERID": '.$obj->USERID.',
        "NAME":"'.trim($obj->NAME).'",
        "TEXT": "'.trim($obj->TEXT).'",
        "TIME": "'.trim($obj->TIME).'",
        "DING":'.$obj->DING.',
    }';
    echo ($json);
}
//点赞更新
else if (strcmp($opt,"changezan")==0)
{
    $optnum=$_GET["optnum"];
    $sql = "update COMMENT set DING=DING+1 where USERID=$optnum";
    $stmt = sqlsrv_query( $conn, $sql);
}