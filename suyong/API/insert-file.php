<?php
//header('content-type:application/json;charset=utf8');
//header("content-Type: text/html; charset=gb2312");
$filename = '../img/'.$_FILES["file"]["name"];
if (file_exists($filename)) {
    echo ('{num:-1}');
} else {
    move_uploaded_file($_FILES["file"]["tmp_name"],$filename );
    if ( file_exists( $filename)) {
	copy($filename, 'E:/Android/MyApp/app/src/main/res/drawable/'.urlencode($_FILES["file"]["name"]));
	copy($filename, 'E:/javaEE/untitled/web/img/'.urlencode($_FILES["file"]["name"]));
        echo ('{num:1}');
    } else {
        echo ('{num:0}');
    }
}

