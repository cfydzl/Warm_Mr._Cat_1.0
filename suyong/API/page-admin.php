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
//菜单数量
if (strcmp($opt,"menunum")==0)
{
    $sql = "select count(*)num from MENU";
    $stmt = sqlsrv_query( $conn, $sql);
    $obj = sqlsrv_fetch_object( $stmt);
    echo ('{num:"'.$obj->num.'"}');
}
//信息显示
elseif (strcmp($opt,"menu")==0)
{
    $optnum=$_POST["optnum"];
    $frontnum=$optnum-1;
    $sql = "select top 1 *from MENU where 
            (NAME not in (select top $frontnum NAME from MENU order by MENUID desc))order by MENUID desc ";
    $stmt = sqlsrv_query( $conn, $sql);
    $obj = sqlsrv_fetch_object($stmt);
    $json = '{
        "MENUID": '.$obj->MENUID.',
        "SPECIES":"'.trim($obj->SPECIES).'",
        "NAME":"'.trim($obj->NAME).'",
        "PRICE": '.$obj->PRICE.',
        "PICTURE": "'.trim($obj->PICTURE).'"
    }';
    echo ($json);
}
//菜单添加
elseif (strcmp($opt,"menuinsert")==0)
{
    $species = $_POST["species"];
    $name = $_POST["name"];
    $price = $_POST["price"];
    $picture = $_POST["picture"];
    $sql="insert into MENU values ('$species','$name',$price,'../img/$picture')";
    $stmt = sqlsrv_query( $conn, $sql);
    $obj = sqlsrv_rows_affected( $stmt);
    if ($obj)
    {
        $sql="select count (*)num from MENU";
        $stmt = sqlsrv_query( $conn, $sql);
        $obj=sqlsrv_fetch_object($stmt);
        $frontnum=$obj->num-1;
        $sql = "select top 1 *from MENU where
        (MENUID not in (select top $frontnum MENUID from MENU order by MENUID))order by MENUID";
        $stmt = sqlsrv_query( $conn, $sql);
        $obj=sqlsrv_fetch_object($stmt);
        $json = '{
            "num":'.$obj->MENUID.',
            "species": "'.trim($obj->SPECIES).'",
            "name":"'.trim($obj->NAME).'",
            "price":'.$obj->PRICE.',
            "picture":"'.trim($obj->PICTURE).'"
            }';
        echo("$json");
    }else
    {
        echo('{num:"0"}');
    }
}
//菜品删除
elseif (strcmp($opt,"menudelete")==0)
{
    $id=$_POST["id"];
    $sql = "select  *from MENU where (MENUID=$id)";
    $stmt = sqlsrv_query( $conn, $sql);
    $obj=sqlsrv_fetch_object($stmt);
    $path=explode("../img/",trim($obj->PICTURE));
    $filename = '../img/'.$path[1];
    if (file_exists(urldecode($filename)))
    {
         $res=unlink(urldecode('E:/Android/MyApp/app/src/main/res/drawable/'.$path[1]));
        $res=unlink(urldecode($filename));
        if ($res)
        {
            $ans=$obj->MENUID;
            $sql = "delete from MENU where ( MENUID = $obj->MENUID)";
            $stmt = sqlsrv_query( $conn, $sql);
            $obj = sqlsrv_rows_affected( $stmt);
            if ($obj){
                echo ('{num:'.$ans.'}');
            }else{
                echo ('{num:0}');
            }
        }else{
            echo ('{num:0}');
        }
    }else{
        echo ('{num:0}');
    }
}
//菜单更新
elseif (strcmp($opt,"menuupdate")==0)
{
    $species=$_POST["species"];
    $name=$_POST["name"];
    $price=$_POST["price"];
    $menuid=$_POST["menuid"];
    $sql = "update MENU set SPECIES='$species', NAME='$name', PRICE=$price where ( MENUID=$menuid)";
    $stmt = sqlsrv_query( $conn, $sql);
    $obj = sqlsrv_rows_affected($stmt);
    if ($obj==1)
    {
        $json = '{
            "menuid": '.$menuid.',
            "species": "'.trim($species).'",
            "name":"'.trim($name).'",
            "price": '.$price.'
        }';
        echo ($json);
    }else{
        echo ('{menuid:"0"}');
    }
}
//餐厅信息
elseif (strcmp($opt,"restaurant")==0)
{
    $text=$_POST["text"];
    $sql = "select  *from RESTAURANT where (NAME='$text')";
    $stmt = sqlsrv_query( $conn, $sql);
    $obj=sqlsrv_fetch_object($stmt);
    $json = '{
            "NINE": '.$obj->NINE.',
            "ELEVEN": '.$obj->ELEVEN.',
            "THIRTEEN": '.$obj->THIRTEEN.',
            "FIFTEEN": '.$obj->FIFTEEN.',
            "SEVENTEEN": '.$obj->SEVENTEEN.',
            "NINETEEN": '.$obj->NINETEEN.'
        }';
    echo ($json);
}
//餐厅情况
elseif (strcmp($opt,"changedesk")==0)
{
    $desk=$_POST["desk"];
    $time=$_POST["time"];
    $num=$_POST["num"];
    $sql = "select *from RESTAURANT where NAME='$desk'";
    $stmt = sqlsrv_query( $conn, $sql);
    $obj = sqlsrv_fetch_object( $stmt);
    if ($obj->$time<=0&&$num==-1)
    {
        echo ('{"num":-1}');
    }else if ($obj->$time==6&&$num==1)
    {
        echo ('{"num":-1}');
    }else
    {
        $sql = "update RESTAURANT set $time=$time+$num where NAME='$desk'";
        $stmt = sqlsrv_query( $conn, $sql);
        $obj = sqlsrv_rows_affected($stmt);
        if ($obj==1)
        {
            echo ('{"num":1}');
        }else{
            echo ('{"num":0}');
        }
    }
}
//定桌数量
elseif (strcmp($opt,"desknum")==0)
{
    $sql = "select count(*)num from BOOK_DESK";
    $stmt = sqlsrv_query( $conn, $sql);
    $obj = sqlsrv_fetch_object( $stmt);
    echo ('{num:"'.$obj->num.'"}');
}
//订桌信息
elseif (strcmp($opt,"desk")==0)
{
    $optnum=$_POST["optnum"];
    $frontnum=$optnum-1;
    $sql = "select top 1 *from BOOK_DESK where 
            (ID not in (select top $frontnum ID from BOOK_DESK order by ID desc))order by ID desc ";
    $stmt = sqlsrv_query( $conn, $sql);
    $obj = sqlsrv_fetch_object($stmt);
    $json = '{
        "ID": '.$obj->ID.',
        "BOOK_ID":"'.trim($obj->BOOK_ID).'",
        "USERNAME":"'.trim($obj->USERNAME).'",
        "TYPE": "'.trim($obj->TYPE).'",
        "TIME": "'.trim($obj->TIME).'"
    }';
    echo ($json);
}
//订桌完成
elseif (strcmp($opt,"cancel-desk")==0)
{
    $id=$_POST["id"];
    $sql = "update BOOK_DESK set type='(%E5%AE%8C%E6%88%90%E8%AE%A2%E6%A1%8C)'+type where ID='$id'";
    $stmt = sqlsrv_query( $conn, $sql);
    $obj = sqlsrv_rows_affected($stmt);
    if ($obj==1)
    {
        $sql = "select *from BOOK_DESK where ID='$id'";
        $stmt = sqlsrv_query( $conn, $sql);
        $obj = sqlsrv_fetch_object($stmt);
        $json = '{
            "num": 1,
            "TYPE":"'.trim($obj->TYPE).'",
            "TIME":"'.trim($obj->TIME).'"
        }';
        echo ($json);
    }else{
        echo ('{"num":0}');
    }
}
//订单数量
elseif (strcmp($opt,"booknum")==0)
{
    $sql = "select count(*)num from BOOK_MENU";
    $stmt = sqlsrv_query( $conn, $sql);
    $obj = sqlsrv_fetch_object( $stmt);
    echo ('{num:"'.$obj->num.'"}');
}
//订单详情
elseif (strcmp($opt,"book")==0)
{
    $optnum=$_POST["optnum"];
    $frontnum=$optnum-1;
    $sql = "select top 1 *from BOOK_MENU where 
            (ID not in (select top $frontnum ID from BOOK_MENU order by ID desc))order by ID desc ";
    $stmt = sqlsrv_query( $conn, $sql);
    $obj = sqlsrv_fetch_object($stmt);
    $json = '{
        "ID": '.$obj->ID.',
        "MENU_ID":"'.trim($obj->MENU_ID).'",
        "USERNAME":"'.trim($obj->USERNAME).'",
        "MENU_NUM": '.trim($obj->MENU_NUM).',
        "TYPE": "'.trim($obj->TYPE).'"
    }';
    echo ($json);
}
//订桌完成
elseif (strcmp($opt,"cancel-book")==0)
{
    $id=$_POST["id"];
    $sql = "update BOOK_MENU set TYPE='(%E5%AE%8C%E6%88%90%E8%AE%A2%E5%8D%95)'+TYPE where ID='$id'";
    $stmt = sqlsrv_query( $conn, $sql);
    $obj = sqlsrv_rows_affected($stmt);
    if ($obj==1)
    {
        $json = '{
            "num": 1
        }';
        echo ($json);
    }else{
        echo ('{"num":0}');
    }
}
//顾客数量
else if (strcmp($opt,"usernum")==0)
{
    $sql = "select count(*)num from INFORMATION";
    $stmt = sqlsrv_query( $conn, $sql);
    $obj = sqlsrv_fetch_object( $stmt);
    echo ('{num:"'.$obj->num.'"}');
}
//顾客显示
else if (strcmp($opt,"usertext")==0)
{
    $optnum=$_POST["optnum"];
    $frontnum=$optnum-1;
    $sql = "select top 1 *from INFORMATION where 
            (ID not in (select top $frontnum ID from INFORMATION order by MANAGEMENT desc ,ID))order by MANAGEMENT desc ,ID";
    $stmt = sqlsrv_query( $conn, $sql);
    $obj = sqlsrv_fetch_object($stmt);
    $json = '{
        "ID": '.$obj->ID.',
        "USERNAME":"'.trim($obj->USERNAME).'",
        "PASSWORD":"'.trim($obj->PASSWORD).'",
        "NAME": "'.trim($obj->NAME).'",
        "PHONE": "'.trim($obj->PHONE).'",
        "ADDRESS": "'.trim($obj->ADDRESS).'",
        "MANAGEMENT":'.trim($obj->MANAGEMENT).'
    }';
    echo ($json);
}
//删除用户
else if (strcmp($opt,"deleteuser")==0)
{
    $id=$_POST["id"];
    $sql = "delete from INFORMATION where ( ID = $id)";
    $stmt = sqlsrv_query( $conn, $sql);
    $obj = sqlsrv_rows_affected( $stmt);
    if ($obj){
        echo ('{num:1}');
    }else{
        echo ('{num:0}');
    }
}
//修改用户
else if(strcmp($opt,"changeuser")==0)
{
    $id=$_POST["id"];
    $password=$_POST["password"];
    $name=$_POST["name"];
    $phone=$_POST["phone"];
    $address=$_POST["address"];
    $man=$_POST["man"];
    $sql = "update INFORMATION set PASSWORD='$password',NAME='$name',PHONE='$phone',ADDRESS='$address',MANAGEMENT=$man where ID='$id'";
    $stmt = sqlsrv_query( $conn, $sql);
    $obj = sqlsrv_rows_affected($stmt);
    if ($obj==1)
    {
        $json = '{"num":1}';
        echo ($json);
    }else{
        echo ('{"num":0}');
    }
}
//主页显示
else if (strcmp($opt,"indexinfo")==0)
{
    $a=array();
    $Y=date("Y");
    $M=date("m");
    $D=date("d");
    $sql = "select count(*)num from BOOK_MENU where MENU_ID like '%$Y$M$D'";
    $stmt = sqlsrv_query( $conn, $sql);
    $obj = sqlsrv_fetch_object( $stmt);
    $a["today-menu"]=$obj->num;
    $sql = "select count(*)num from BOOK_MENU where TYPE like '(%E5%AE%8C%E6%88%90%E8%AE%A2%E5%8D%95)%'";
    $stmt = sqlsrv_query( $conn, $sql);
    $obj = sqlsrv_fetch_object( $stmt);
    $a["win-menu"]=$obj->num;
    $sql = "select count(*)num from BOOK_MENU";
    $stmt = sqlsrv_query( $conn, $sql);
    $obj = sqlsrv_fetch_object( $stmt);
    $a["sum-menu"]=$obj->num;
    $sql = "select count(*)num from BOOK_DESK where BOOK_ID like '%$Y$M$D'";
    $stmt = sqlsrv_query( $conn, $sql);
    $obj = sqlsrv_fetch_object( $stmt);
    $a["today-book"]=$obj->num;
    $sql = "select count(*)num from BOOK_DESK where TYPE like '(%E5%AE%8C%E6%88%90%E8%AE%A2%E6%A1%8C)%'";
    $stmt = sqlsrv_query( $conn, $sql);
    $obj = sqlsrv_fetch_object( $stmt);
    $a["win-book"]=$obj->num;
    $sql = "select count(*)num from BOOK_DESK";
    $stmt = sqlsrv_query( $conn, $sql);
    $obj = sqlsrv_fetch_object( $stmt);
    $a["sum-book"]=$obj->num;
    $sql = "select count(*)num from INFORMATION";
    $stmt = sqlsrv_query( $conn, $sql);
    $obj = sqlsrv_fetch_object( $stmt);
    $a["sum-user"]=$obj->num;
    $sql = "select count(*)num from COMMENT";
    $stmt = sqlsrv_query( $conn, $sql);
    $obj = sqlsrv_fetch_object( $stmt);
    $a["sum-comment"]=$obj->num;
    print_r(json_encode($a));
}