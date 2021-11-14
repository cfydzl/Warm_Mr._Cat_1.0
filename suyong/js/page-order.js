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
                    console.log()
                    if (textobj.num == "0") {
                        window.location.href = "index.html";
                    } else if (textobj.num == "1") {
                        $(".center-top-name").text(username)
                    } else {
                        window.location.href = "admin.html";
                    }
                }
            })
        }else {
            $(".center-top-name").text("游客")
            $(".center-name>a").text("登录")
        }
    }
})
//退出
$(function () {
    $(".exit").click(function () {
        document.cookie = "username= ; expires=" +(new Date(0)).toUTCString();;
        document.cookie = "password= ; expires=" +(new Date(0)).toUTCString();;
        window.location.href = "index.html";
    })
})
//定单显示
$(function () {
    var username="username";
    var password="password";
    var cookie = document.cookie;
    var reg = new RegExp("(^|\\s)" + username + "=([^;]+)(;|$)");
    var username = cookie.match(reg)[2];
    reg = new RegExp("(^|\\s)" + password + "=([^;]+)(;|$)");
    var password = cookie.match(reg)[2];
    $.ajax({
        type:"POST",
        url: "../API/orderapi.php",
        data :{
            opt:"findnum",
            username:username,
            password:password
        },
        async: false,
        success:function (num) {
            var textnum =eval("("+num+")");
            if (textnum.num<=0)
            {
                console.log("数据库无数据");
                return false;
            }
            for (var i =1;i<=textnum.num;i++)
            {
                $.ajax({
                    type: "POST",
                    url: "../API/orderapi.php",
                    data: {
                        opt : "findrestaurant",
                        optnum : i,
                        username:username,
                        password:password
                    },
                    async: false,
                    success:function (text) {
                        var textobj =eval("("+text+")");
                        var join=""
                        if (decodeURIComponent(decodeURI(textobj.TYPE))=='(取消订单)外卖'||
                            decodeURIComponent(decodeURI(textobj.TYPE))=='(取消订单)堂食'||
                            decodeURIComponent(decodeURI(textobj.TYPE))=='(完成订单)堂食'||
                            decodeURIComponent(decodeURI(textobj.TYPE))=='(完成订单)外卖')
                        {
                            join="<div class=\"details\">\n" +
                                "            <img src=\"../img/1.png\">\n" +
                                "            <div class=\"details-title\">暖喵先生</div>\n" +
                                "            <span class=\"details-button select\">已结单<p style=\"display: none\">"+textobj.ID+"</p></span>\n" +
                                "            <div class=\"details-sum\">总价￥:"+textobj.MENU_NUM+"</div>\n" +
                                "            <div class=\"details-type\">订单类型:&nbsp&nbsp&nbsp"+decodeURIComponent(decodeURI(textobj.TYPE))+"</div>\n" +
                                "            <div class=\"details-id select\">订单编号："+textobj.MENU_ID+"&nbsp&nbsp&nbsp(点击查看详情)<p style=\"display: none\">"+textobj.ID+"</p></div>\n" +
                                "        </div>"
                        }else
                        {
                            join="<div class=\"details\">\n" +
                                "            <img src=\"../img/1.png\">\n" +
                                "            <div class=\"details-title\">暖喵先生</div>\n" +
                                "            <span class=\"details-button select\">退订<p style=\"display: none\">"+textobj.ID+"</p></span>\n" +
                                "            <div class=\"details-sum\">总价￥:"+textobj.MENU_NUM+"</div>\n" +
                                "            <div class=\"details-type\">订单类型:&nbsp&nbsp&nbsp"+decodeURIComponent(decodeURI(textobj.TYPE))+"</div>\n" +
                                "            <div class=\"details-id select\">订单编号："+textobj.MENU_ID+"&nbsp&nbsp&nbsp(点击查看详情)<p style=\"display: none\">"+textobj.ID+"</p></div>\n" +
                                "        </div>"
                        }
                        $(".order-information-text").prepend(join)
                    },
                    error:function(){ //失败的函数
                        console.log("数据库无数据");
                    }
                })
            }
        }
    })
})
//订桌
$(function () {
    $(".close-desk-information").click(function () {
        $(".desk-information-text").html(null)
        var username="username";
        var password="password";
        var cookie = document.cookie;
        var reg = new RegExp("(^|\\s)" + username + "=([^;]+)(;|$)");
        var username = cookie.match(reg)[2];
        reg = new RegExp("(^|\\s)" + password + "=([^;]+)(;|$)");
        var password = cookie.match(reg)[2];
        $.ajax({
            type:"POST",
            url: "../API/orderapi.php",
            data :{
                opt:"finddesknum",
                username:username,
                password:password
            },
            async: false,
            success:function (num) {
                var textnum =eval("("+num+")");
                if (textnum.num<=0)
                {
                    console.log("数据库无数据");
                    return false;
                }
                for (var i =1;i<=textnum.num;i++)
                {
                    $.ajax({
                        type: "POST",
                        url: "../API/orderapi.php",
                        data: {
                            opt : "finddesk",
                            optnum : i,
                            username:username,
                            password:password
                        },
                        async: false,
                        success:function (text) {
                            var textobj =eval("("+text+")");
                            if((decodeURIComponent(decodeURI(textobj.TYPE)).indexOf("(取消订桌)")!=-1)||(decodeURIComponent(decodeURI(textobj.TYPE)).indexOf("(完成订桌)")!=-1))
                            {
                                join="<div class=\"details\">\n" +
                                    "            <img src=\"../img/1.png\">\n" +
                                    "            <div class=\"details-title\">暖喵先生</div>\n" +
                                    "            <span class=\"details-button select\">已结单<p style=\"display: none\">"+textobj.ID+"</p></span>\n" +
                                    "            <div class=\"details-sum\"></div>\n" +
                                    "            <div class=\"details-type\">订桌类型:&nbsp&nbsp&nbsp"+decodeURIComponent(decodeURI(textobj.TYPE))+"&nbsp&nbsp&nbsp订桌时间:&nbsp&nbsp&nbsp"+textobj.TIME+"</div>\n" +
                                    "            <div class=\"details-id select\">订桌编号："+textobj.BOOK_ID+"<p style=\"display: none\">"+textobj.ID+"</p></div>\n" +
                                    "        </div>"
                            }else {
                                join="<div class=\"details\">\n" +
                                    "            <img src=\"../img/1.png\">\n" +
                                    "            <div class=\"details-title\">暖喵先生</div>\n" +
                                    "            <span class=\"details-button select\">退订<p style=\"display: none\">"+textobj.ID+"</p></span>\n" +
                                    "            <div class=\"details-sum\"></div>\n" +
                                    "            <div class=\"details-type\">订桌类型:&nbsp&nbsp&nbsp"+decodeURIComponent(decodeURI(textobj.TYPE))+"&nbsp&nbsp&nbsp订桌时间:&nbsp&nbsp&nbsp"+textobj.TIME+"</div>\n" +
                                    "            <div class=\"details-id select\">订桌编号："+textobj.BOOK_ID+"<p style=\"display: none\">"+textobj.ID+"</p></div>\n" +
                                    "        </div>"
                            }
                            $(".desk-information-text").prepend(join)
                        },
                        error:function(){ //失败的函数
                            console.log("数据库无数据");
                        }
                    })
                }
            }
        })
    })
    var username="username";
    var password="password";
    var cookie = document.cookie;
    var reg = new RegExp("(^|\\s)" + username + "=([^;]+)(;|$)");
    var username = cookie.match(reg)[2];
    reg = new RegExp("(^|\\s)" + password + "=([^;]+)(;|$)");
    var password = cookie.match(reg)[2];
    function fun(ptype,ptime)
    {
        if (ptype==encodeURI("(取消订桌)两人桌"))
        {
            ptype='two';
        }else if (ptype==encodeURI("(取消订桌)四人桌"))
        {
            ptype='four';
        }else if (ptype==encodeURI("(取消订桌)六人桌"))
        {
            ptype='six';
        }else if (ptype==encodeURI("(取消订桌)大包厢"))
        {
            ptype='eight';
        }
        if (ptime=="09:00-11:00")
        {
            ptime='NINE'
        }else if (ptime=="11:00-13:00")
        {
            ptime='ELEVEN'
        }else if (ptime=="13:00-15:00")
        {
            ptime='THIRTEEN'
        }else if (ptime=="15:00-17:00")
        {
            ptime='FIFTEEN'
        }else if (ptime=="17:00-19:00")
        {
            ptime='SEVENTEEN'
        }else if (ptime=="19:00-21:00")
        {
            ptime='NINETEEN'
        }
        $.ajax({
            type:"POST",
            url: "../API/orderapi.php",
            data :{
                opt:"change",
                type:ptype,
                time:ptime,
            },
            async: false,
            success:function (text)
            {
                var textobj =eval("("+text+")");
                if (textobj.cal=="1")
                {
                    alert("取消订桌成功")
                }else
                {
                    console.log("修改失败")
                }
            }
        })
    }
    $(".right-desk-information").delegate(".details-button","click",function () {
        var caltext=$(this).children().text();
        var now=$(this);
        if(!($(this).text().indexOf("已")!=-1))
        {
            $.ajax({
                type:"POST",
                url: "../API/orderapi.php",
                data :{
                    opt:"canceldesk",
                    cal:caltext,
                    username:username,
                    password:password
                },
                async: false,
                success:function (text) {
                    var textobj =eval("("+text+")");
                    if (textobj.cal=="1")
                    {
                        fun(textobj.TYPE,textobj.TIME)
                        $(".close-desk-information").click()
                    }
                }
            })
        }
    })
})
//退单事件
$(function () {
    var username="username";
    var password="password";
    var cookie = document.cookie;
    var reg = new RegExp("(^|\\s)" + username + "=([^;]+)(;|$)");
    var username = cookie.match(reg)[2];
    reg = new RegExp("(^|\\s)" + password + "=([^;]+)(;|$)");
    var password = cookie.match(reg)[2];
    $(".right-order-information").delegate(".details-button","click",function () {
        var caltext=$(this).children().text()
        if(!($(this).text().indexOf("已")!=-1))
        {
            $.ajax({
                type:"POST",
                url: "../API/orderapi.php",
                data :{
                    opt:"cancel",
                    cal:caltext,
                    username:username,
                    password:password
                },
                async: false,
                success:function (text) {
                    var textobj =eval("("+text+")");
                    if (textobj.cal=="1")
                    {
                        alert("取消订单成功")
                        window.location.href="order.html";
                    }
                }
            })
        }
    })
})
//查看订单
$(function () {
    var username="username";
    var password="password";
    var cookie = document.cookie;
    var reg = new RegExp("(^|\\s)" + username + "=([^;]+)(;|$)");
    var username = cookie.match(reg)[2];
    reg = new RegExp("(^|\\s)" + password + "=([^;]+)(;|$)");
    var password = cookie.match(reg)[2];
    $(".mask>div>div>p").click(function () {
        $(".mask").attr("style","display:none");
    })
    $(".right-order-information").delegate(".details-id","click",function () {
        var optnum=$(this).children().text();
        $(".mask").removeAttr("style")
        $.ajax({
            type: "POST",
            url: "../API/orderapi.php",
            data: {
                opt : "findtext",
                optnum : optnum,
                username:username,
                password:password
            },
            async: false,
            success:function (text) {
                var textobj =eval("("+text+")");
                textobj.MENU_TEXT=decodeURIComponent(decodeURI(textobj.MENU_TEXT));
                var menutext=textobj.MENU_TEXT.split(",")
                $(".book-title>span").text("￥"+textobj.MENU_NUM+"元")
                for (var i =0;i<menutext.length;i++)
                {
                    var join="<div>"+menutext[i]+"</div>"
                    $(".mask-text").append(join)
                }
            }
        })
    })
})
//切换
$(function () {
    $(".close-left>div").click(function () {
        $(".right-order-information").attr("style","display:none");
        $(".right-desk-information").attr("style","display:none");
        $(".right-comment-information").attr("style","display:none");
        if ($(this).text()=="菜品订单")
        {
            $(".right-order-information").removeAttr("style")
        }else if ($(this).text()=="桌位订单")
        {
            $(".right-desk-information").removeAttr("style")
        }else
        {
            $(".right-comment-information").removeAttr("style")
        }
    })
})
//评论区加载
$(function () {
    var username="username";
    var password="password";
    var cookie = document.cookie;
    var reg = new RegExp("(^|\\s)" + username + "=([^;]+)(;|$)");
    var username = cookie.match(reg)[2];
    reg = new RegExp("(^|\\s)" + password + "=([^;]+)(;|$)");
    var password = cookie.match(reg)[2];
    $.ajax({
        type:"POST",
        url: "../API/orderapi.php",
        data :{
            opt:"findtextnum",
            username:username,
            password:password
        },
        async: false,
        success:function (num) {
            var textnum =eval("("+num+")");
            if (textnum.num<=0)
            {
                console.log("数据库无数据");
                return false;
            }
            for (var i =1;i<=textnum.num;i++)
            {
                $.ajax({
                    type: "POST",
                    url: "../API/orderapi.php",
                    data: {
                        opt : "findcomment",
                        optnum : i,
                        username:username,
                        password:password
                    },
                    async: false,
                    success:function (text) {
                        var textobj =eval("("+text+")");
                         var join="<div class=\"info-list\" id=\""+textobj.USERID+"\">\n" +
                             "            <div class=\"list-text\">"+decodeURIComponent(decodeURI(textobj.TEXT))+"</div>\n" +
                             "            <div class=\"list-time\">"+textobj.TIME+"</div>\n" +
                             "            <span class=\"fa fa-thumbs-o-up\"> "+textobj.DING+"</span>\n" +
                             "            <span class=\"fa fa-trash-o\"><p style=\"display: none\">"+textobj.USERID+"</p></span>\n" +
                             "        </div>"
                         $(".comment-information-list").prepend(join)
                    },
                    error:function(){ //失败的函数
                        console.log("数据库无数据");
                    }
                })
            }
        }
    })
})
//评论区发表
$(function () {
    var username="username";
    var password="password";
    var cookie = document.cookie;
    var reg = new RegExp("(^|\\s)" + username + "=([^;]+)(;|$)");
    var username = cookie.match(reg)[2];
    reg = new RegExp("(^|\\s)" + password + "=([^;]+)(;|$)");
    var password = cookie.match(reg)[2];
    $(".comment-information-submit").click(function () {
        if(username!="visitor") {
            if ($(".comment-information-text").val().trim().length!=0) {
                $.ajax({
                    type: "POST",
                    url: "../API/orderapi.php",
                    data: {
                        opt: "insert",
                        opttext: encodeURI($(".comment-information-text").val()),
                        username: username,
                        password: password
                    },
                    async: false,
                    success: function (text) {
                        var textobj = eval("(" + text + ")");
                        if (textobj.num == 1) {
                            var join = "<div class=\"info-list\" id=\"" + textobj.USERID + "\">\n" +
                                "            <div class=\"list-text\">" + decodeURIComponent(decodeURI(textobj.TEXT)) + "</div>\n" +
                                "            <div class=\"list-time\">" + textobj.TIME + "</div>\n" +
                                "            <span class=\"fa fa-thumbs-o-up\"> " + textobj.DING + "</span>\n" +
                                "            <span class=\"fa fa-trash-o\"><p style=\"display: none\">" + textobj.USERID + "</p></span>\n" +
                                "        </div>"
                            $(".comment-information-list").prepend(join)
                            alert("发表成功")
                            $(".comment-information-text").val("")
                        } else {
                            alert("发表失败")
                        }
                    }
                })
            }else {
                alert("输入为空")
            }
        }else {
            alert("请前往个人中心登录")
        }
    })
})
//删除评论
$(function () {
    $(".comment-information-list").delegate(".fa-trash-o","click",function () {
        var userid=$(this).children().text();
        $.ajax({
            type: "POST",
            url: "../API/orderapi.php",
            data: {
                opt: "delete",
                optid: userid
            },
            async: false,
            success: function (ans) {
                var ansobj = eval("(" + ans + ")");
                if (ansobj.num==1) {
                    userid=".comment-information-list>#"+userid;
                    // console.log($(userid).html())
                    $(userid).remove()
                    alert("删除成功")
                } else {
                    alert("删除失败")
                }
            }
        })
    })
})