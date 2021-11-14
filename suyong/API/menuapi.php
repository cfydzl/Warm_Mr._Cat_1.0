<?php
//header('content-type:application/json;charset=utf8');
header("content-Type: text/html; charset=gb2312");
//服务器
$serverName = "localhost";//服务器的名字，本地localhost
$connectionInfo = array( "Database"=>"myweb", "UID"=>"cfydzl", "PWD"=>"123506467");
$conn = sqlsrv_connect( $serverName, $connectionInfo);
//获取前端操作指令
$opt=$_GET["opt"];
//$opt="findnume";
//对应菜单个数
if (strcmp($opt,"menunum")==0)
{
    $name=$_GET["name"];
    $sql = "select count(*)num from MENU where (SPECIES = '$name')";
    $stmt = sqlsrv_query( $conn, $sql);
    $obj = sqlsrv_fetch_object( $stmt);
    $json = json_encode(
        array(
            "num"=>$obj->num
        ),JSON_UNESCAPED_UNICODE);
    echo ($json);
}
//菜单加载
else if(strcmp($opt,"menutext")==0)
{
    $optnum=$_GET["optnum"];
    $frontnum=$optnum-1;
    $name=$_GET["name"];
    $sql = "select top 1 *from MENU where 
            (NAME not in (select top $frontnum NAME from MENU where SPECIES='$name' order by PRICE,MENUID)
                and SPECIES='$name')order by PRICE,MENUID";
    $stmt = sqlsrv_query( $conn, $sql);
    $obj = sqlsrv_fetch_object($stmt);
    $json = '{
        "MENUID": '.$obj->MENUID.',
        "SPECIES":"'.trim($obj->SPECIES).'",
        "NAME":"'.trim($obj->NAME).'",
        "PRICE": '.$obj->PRICE.',
        "PICTURE": "'.trim($obj->PICTURE).'",
    }';
    echo ($json);
}
//购物车添加
else if(strcmp($opt,"findnume")==0)
{
    $optid=$_GET["id"];
//    $optid=1;
    $sql = "select *from MENU where (MENUID =$optid)";
    $stmt = sqlsrv_query( $conn, $sql);
    $obj = sqlsrv_fetch_object($stmt);
    $json = '{
        "MENUID": '.$obj->MENUID.',
        "NAME":"'.trim($obj->NAME).'",
        "PRICE": '.$obj->PRICE.'
    }';
    echo ($json);
}
//下单
else if(strcmp($opt,"bookmenu")==0)
{
    $menutext=$_GET["menutext"];
    $menunum=$_GET["menunum"];
    $typetext=$_GET["typetext"];
    $username=$_GET["username"];
    $password=$_GET["password"];
    $Y=date("Y");
    $M=date("m");
    $D=date("d");
    $sql="insert into BOOK_MENU values ('$username$Y$M$D','$username','$menutext','$menunum','$typetext')";
    $stmt = sqlsrv_query( $conn, $sql);
    $obj = sqlsrv_rows_affected($stmt);
    if ($obj==1)
    {
        echo ('{"num":1}');
    }else
    {
        echo ('{"num":0}');
    }
}