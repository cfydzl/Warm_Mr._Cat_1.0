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
//取消订单
if (strcmp($opt,"cancel")==0)
{
    $cal=$_POST["cal"];
    $username=$_POST["username"];
    $password=$_POST["password"];
    $sql = "update BOOK_MENU set TYPE='(%E5%8F%96%E6%B6%88%E8%AE%A2%E5%8D%95)'+TYPE where 
                (ID='$cal' and USERNAME='$username')";
    $stmt = sqlsrv_query( $conn, $sql);
    $obj = sqlsrv_rows_affected($stmt);
    if($obj==1)
    {
        echo ('{cal:"1"}');
    }else
    {
        echo ('{cal:"0"}');
    }
}
//订单个数
else if (strcmp($opt,"findnum")==0)
{
    $username=$_POST["username"];
    $password=$_POST["password"];
    $sql = "select count(*)num from BOOK_MENU where USERNAME='$username'";
    $stmt = sqlsrv_query( $conn, $sql);
    $obj = sqlsrv_fetch_object( $stmt);
    $json = '{
            "num": '.$obj->num.'
        }';
    echo ($json);
}
//订单查看
else if (strcmp($opt,"findrestaurant")==0)
{
    $username=$_POST["username"];
    $password=$_POST["password"];
    $optnum=$_POST["optnum"];
    $frontnum=$optnum-1;
    $sql = "select top 1 *from BOOK_MENU where
        (ID not in (select top $frontnum ID from BOOK_MENU where USERNAME='$username'order by ID)
            and USERNAME='$username')order by ID";
    $stmt = sqlsrv_query( $conn, $sql);
    $obj = sqlsrv_fetch_object($stmt);
    $json = '{
        "ID": '.$obj->ID.',
        "MENU_ID":"'.trim($obj->MENU_ID).'",
        "MENU_TEXT":"'.trim($obj->MENU_TEXT).'",
        "MENU_NUM":'.$obj->MENU_NUM.',
        "TYPE": "'.trim($obj->TYPE).'"
    }';
    echo ($json);
}
//菜单详细查看
else if (strcmp($opt,"findtext")==0)
{
    $optnum=$_POST["optnum"];
    $sql = "select  *from BOOK_MENU where ID='$optnum'";
    $stmt = sqlsrv_query( $conn, $sql);
    $obj = sqlsrv_fetch_object($stmt);
    $json = '{
        "ID": '.$obj->ID.',
        "MENU_ID":"'.trim($obj->MENU_ID).'",
        "MENU_TEXT":"'.trim($obj->MENU_TEXT).'",
        "MENU_NUM":'.$obj->MENU_NUM.',
        "TYPE": "'.trim($obj->TYPE).'"
    }';
    echo ($json);
}
//桌数
else if (strcmp($opt,"finddesknum")==0)
{
    $username=$_POST["username"];
    $password=$_POST["password"];
    $sql = "select count(*)num from BOOK_DESK where USERNAME='$username'";
    $stmt = sqlsrv_query( $conn, $sql);
    $obj = sqlsrv_fetch_object( $stmt);
    $json = '{
            "num": '.$obj->num.'
        }';
    echo ($json);
}
//订桌查看
else if (strcmp($opt,"finddesk")==0)
{
    $username=$_POST["username"];
    $password=$_POST["password"];
    $optnum=$_POST["optnum"];
    $frontnum=$optnum-1;
    $sql = "select top 1 *from BOOK_DESK where
        (ID not in (select top $frontnum ID from BOOK_DESK where USERNAME='$username' order by ID)
            and USERNAME='$username')order by ID";
    $stmt = sqlsrv_query( $conn, $sql);
    $obj = sqlsrv_fetch_object($stmt);
    $json = '{
        "ID": '.$obj->ID.',
        "BOOK_ID":"'.trim($obj->BOOK_ID).'",
        "TYPE":"'.trim($obj->TYPE).'",
        "TIME":"'.trim($obj->TIME).'"
    }';
    print_r ($json);
}
//取消订桌
else if (strcmp($opt,"canceldesk")==0)
{
    $cal=$_POST["cal"];
    $username=$_POST["username"];
    $password=$_POST["password"];
    $sql = "update BOOK_DESK set TYPE='(%E5%8F%96%E6%B6%88%E8%AE%A2%E6%A1%8C)'+TYPE where
                (ID='$cal' and USERNAME='$username')";
    $stmt = sqlsrv_query( $conn, $sql);
    $obj = sqlsrv_rows_affected($stmt);
    if($obj==1)
    {
        $sql = "select *from BOOK_DESK where ID='$cal'";
        $stmt = sqlsrv_query( $conn, $sql);
        $obj = sqlsrv_fetch_object($stmt);
        $json = '{
            "cal":"1",
            "TYPE":"'.trim($obj->TYPE).'",
            "TIME":"'.trim($obj->TIME).'"
            }';
        echo ($json);
    }else
    {
        echo ('{cal:"0"}');
    }
}
//更新界面
else if (strcmp($opt,"change")==0)
{
    $type=$_POST["type"];
    $time=$_POST["time"];
    $sql = "update RESTAURANT set $time=$time+1 where NAME='$type'";
    $stmt = sqlsrv_query( $conn, $sql);
    $obj = sqlsrv_rows_affected($stmt);
    if ($obj==1)
    {
        echo ('{"cal":1}');
    }else
    {
        echo ('{"cal":0}');
    }
}
//评论数
else if (strcmp($opt,"findtextnum")==0)
{
    $username=$_POST["username"];
    $password=$_POST["password"];
    $sql = "select count(*)num from COMMENT where NAME='$username'";
    $stmt = sqlsrv_query( $conn, $sql);
    $obj = sqlsrv_fetch_object( $stmt);
    $json = '{
            "num": '.$obj->num.'
        }';
    echo ($json);
}
//评论信息
else if (strcmp($opt,"findcomment")==0)
{
    $username=$_POST["username"];
    $password=$_POST["password"];
    $optnum=$_POST["optnum"];
    $frontnum=$optnum-1;
    $sql = "select top 1 *from COMMENT where
        (USERID not in (select top $frontnum USERID from COMMENT where NAME='$username' order by USERID)
            and NAME='$username')order by USERID";
    $stmt = sqlsrv_query( $conn, $sql);
    $obj = sqlsrv_fetch_object($stmt);
    $json = '{
        "USERID": '.$obj->USERID.',
        "TEXT":"'.trim($obj->TEXT).'",
        "TIME":"'.trim($obj->TIME).'",
        "DING":"'.trim($obj->DING).'"
    }';
    print_r ($json);
}
//删除评论
else if (strcmp($opt,"delete")==0)
{
    $optid=$_POST["optid"];
    $sql = "delete from COMMENT where ( USERID = '$optid')";
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
//插入信息
else if (strcmp($opt,"insert")==0)
{
    $Y=date("Y");
    $M=date("m");
    $D=date("d");
    $username=$_POST["username"];
    $password=$_POST["password"];
    $opttext=$_POST["opttext"];
    $sql = "select *from INFORMATION where USERNAME='$username'";
    $stmt = sqlsrv_query( $conn, $sql);
    $obj = sqlsrv_fetch_object($stmt);
    $sql="insert into COMMENT values ('$obj->NAME','$opttext','$Y-$M-$D',0)";
    $stmt = sqlsrv_query( $conn, $sql);
    $obj = sqlsrv_rows_affected( $stmt);
    if ($obj==true)
    {
        $sql = "select count(*)num from COMMENT";
        $stmt = sqlsrv_query( $conn, $sql);
        $obj = sqlsrv_fetch_object( $stmt);
        $frontnum=$obj->num-1;
        $sql = "select top 1 *from COMMENT where
        (USERID not in (select top $frontnum USERID from COMMENT order by USERID))order by USERID";
        $stmt = sqlsrv_query( $conn, $sql);
        $obj = sqlsrv_fetch_object( $stmt);
        $sql = "select *from COMMENT where USERID='$obj->USERID'";
        $stmt = sqlsrv_query( $conn, $sql);
        $obj = sqlsrv_fetch_object($stmt);
        $json = '{
        "num":1,
        "USERID": '.$obj->USERID.',
        "TEXT":"'.trim($obj->TEXT).'",
        "TIME":"'.trim($obj->TIME).'",
        "DING":"'.trim($obj->DING).'"
        }';
        echo ($json);
    }
}