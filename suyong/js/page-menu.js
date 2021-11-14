//自动登录
$(function () {
    if (document.cookie.indexOf("username=") == -1) {
        console.log("没有用户名")
        window.location.href = "index.html";
    } else {
        var username="username";
        var password="password";
        var cookie = document.cookie;
        var reg = new RegExp("(^|\\s)" + username + "=([^;]+)(;|$)");
        var username = cookie.match(reg)[2];
        reg = new RegExp("(^|\\s)" + password + "=([^;]+)(;|$)");
        var password = cookie.match(reg)[2];
        if (username!="visitor") {
            $.ajax({
                type: "POST",
                url: "../information/user-information.php",
                data: {
                    opt: "state",
                    username: username,
                    password: password
                },
                async: false,
                success: function (text) {
                    var textobj = eval("(" + text + ")");
                    if (textobj.num == "0") {
                        window.location.href = "index.html";
                    } else if (textobj.num == "2") {
                        window.location.href = "admin.html";
                    }
                }
            })
        }
    }
})
//菜单生成
$(function () {
    var list=new Array();
    list[0]="%E6%8E%A8%E8%8D%90";
    list[1]="%E4%B8%BB%E9%A3%9F";
    list[2]="%E6%97%B6%E7%B4%A0";
    list[3]="%E6%97%B6%E8%8D%A4";
    list[4]="%E6%B5%93%E6%B1%A4";
    list[5]="%E5%B0%8F%E9%A3%9F";
    list[6]="%E9%85%92%E6%B0%B4";
    var species=new Array();
    species[0]="tuijian";
    species[1]="zhushi";
    species[2]="shisu";
    species[3]="shihun";
    species[4]="nongtang";
    species[5]="xiaoshi";
    species[6]="jiushui";
    for (var j=0;j<7;j++)
    {
        $.ajax({
            type: "GET",
            url: "../API/menuapi.php",
            data: {
                opt : "menunum",
                name: list[j]
            },
            async: false,
            success:function (num) {
                var numobj =eval("("+num+")");
                if (numobj<=0)
                {
                    console.log("数据库无数据");
                    return false;
                }
                for (var i=1;i<=numobj.num;i++)
                {
                    $.ajax({
                        type: "GET",
                        url: "../API/menuapi.php",
                        data: {
                            opt : "menutext",
                            optnum : i,
                            name: list[j]
                        },
                        async: false,
                        success:function (text) {
                            var textobj =eval("("+text+")");
                            var join="<div class=\"menu-picture\" id=\""+textobj.MENUID+"\">" +
                                            "<img src=\""+textobj.PICTURE+"\">" +
                                            "<div class='name-price'>" +
                                                    "<div class=\"menu-picture-name\">"+decodeURIComponent(decodeURI(textobj.NAME))+"</div>" +
                                                    "<div class=\"menu-picture-price\">￥"+textobj.PRICE+"元</div>" +
                                            "</div>"+
                                            "<div class=\"menu-num\">\n" +
                                                "<div class=\"span-jia\"><span class=\"fa fa-plus-square-o\"></span></div>" +
                                                "<p class="+textobj.MENUID+">0</p>" +
                                                "<div class=\"span-jian\"><span class=\"fa fa-minus-square-o\"></span></div>" +
                                            "</div>" +
                                    "</div>"
                            $("."+species[j]).append(join);
                        },
                        error:function(){ //失败的函数
                            console.log("数据库无数据");
                        }
                    })
                }
            }
        })
    }
})
//菜单数量获取
$(function () {
    $(".menu-information-title>li").click(function () {
        $(".menu-information-title>li").removeClass('title-color');
        $(this).addClass('title-color');
        var d=document.getElementsByName("sum-menu");
        for (var i=0;i<d.length;i++)
        {
            d[i].style.display="none";
        }
        d[$(this).index()].style.display="block";
        //alert($(this).page());
    })
})
//菜单点击事件
$(function (message) {
    //账单求和
    function calculate(price,opt) {
        $(".pay-num").text(parseInt($(".pay-num").text(),10)+(price*opt));
    }
    //添加购物车
    function fun(num,menuid,opt)
    {
        $.ajax({
            type: "GET",
            url: "../API/menuapi.php",
            data: {
                opt : "findnume",
                id: menuid
            },
            async: false,
            success:function (ans) {
                var ansobj =eval("("+ans+")");
                var join ="<div class="+menuid+">\n" +
                    "                    <div class=\"car-text-name\">"+decodeURIComponent(decodeURI(ansobj.NAME))+"￥"+ansobj.PRICE+"</div>\n" +
                    "                    <div class=\"car-text-num\">\n" +
                    "                        <div class=\"p-jia\"><span class=\"fa fa-plus-square-o\"></span></div>\n" +
                    "                        <p class=\"pay-price select\">"+num+"</p>\n" +
                    "                        <div class=\"p-jian\"><span class=\"fa fa-minus-square-o\"></span></div>\n" +
                    "                    </div>\n" +
                    "                </div>"
                var ID=".car-text ."+menuid;
                $(ID).remove();
                if (num>0)
                {
                    $(".car-text").append(join);
                }
                calculate(ansobj.PRICE,opt);
            },
            error:function () {
                console.log("操作失败");
            }
        })
    }
    $(".menu-information").delegate(".span-jia","click",function () {
        $(this).next().text(parseInt($(this).next().text(),10)+1);
        fun($(this).next().text(),$(this).next().attr("class"),1);
    })
    $(".menu-information").delegate(".span-jian","click",function () {
        if (parseInt($(this).prev().text(),10)>0)
        {
            $(this).prev().text(parseInt($(this).prev().text(),10)-1)
            fun($(this).prev().text(),$(this).prev().attr("class"),-1);
        }
    })
    //购物车点击-->返回去点击菜单
    $(".car-text").delegate(".p-jia","click",function () {
        var ID="#"+$(this).parent().parent().attr("class")+" .span-jia";
        $(ID).trigger("click");
    })
    $(".car-text").delegate(".p-jian","click",function () {
        var ID="#"+$(this).parent().parent().attr("class")+" .span-jian";
        $(ID).trigger("click");
    })
})
//结算
$(function () {
    $(".pay-button").click(function () {
        var cookie=document.cookie;
        var username="username";
        var password="password";
        var reg = new RegExp("(^|\\s)"+ username +"=([^;]+)(;|$)");
        username=cookie.match(reg)[2];
        reg = new RegExp("(^|\\s)"+ password +"=([^;]+)(;|$)");
        password=cookie.match(reg)[2];
        if (username!="visitor")
        {
            $(".mask").removeAttr("style")
        }else {
            alert("请前往个人中心登录")
        }
    })
    $(".mask>div>div>p").click(function () {
        $(".mask").attr("style","display:none");
    })
    $(".book-submit").click(function () {
        if (parseInt($(".pay-button").prev().text(),10)>0)
        {
            var text="";
            var name=document.getElementsByClassName("car-text-name");
            var len=document.getElementsByClassName("car-text-name").length;
            var price=document.getElementsByClassName("pay-price");
            for (var i=0;i<len;i++)
            {
                text=text+name[i].innerHTML+"*"+price[i].innerHTML;
                if (i<len-1)
                {
                    text=text+",";
                }
            }
            var $typetext="";
            if ($('input[name="out"]:checked').attr("class")=="into")
            {
                $typetext="%E5%A0%82%E9%A3%9F";
            }else
            {
                $typetext="%E5%A4%96%E5%8D%96";
            }
            var cookie=document.cookie;
            var username="username";
            var password="password";
            var reg = new RegExp("(^|\\s)"+ username +"=([^;]+)(;|$)");
            username=cookie.match(reg)[2];
            reg = new RegExp("(^|\\s)"+ password +"=([^;]+)(;|$)");
            password=cookie.match(reg)[2];
            $.ajax({
                type:"GET",
                url: "../API/menuapi.php",
                data: {
                    opt : "bookmenu",
                    menutext:encodeURI(text),
                    menunum:$(".pay-num").text(),
                    typetext:$typetext,
                    username:username,
                    password:password
                },
                async: false,
                success:function (ans) {
                     var ansobj =eval("("+ans+")");
                     //console.log(ansobj)
                    if(ansobj.num==1)
                    {
                        alert("订单下单完成");
                        window.location.href="menu.html";
                    }else
                    {
                        alert("订单下单失败")
                    }
                }
            })
        }
    })
})