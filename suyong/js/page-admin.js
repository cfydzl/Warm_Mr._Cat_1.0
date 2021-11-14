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
                }else if (textobj.num=="1")
                {
                    window.location.href = "indexshow.html";
                }else
                {
                    $(".admin-user").text(username)
                }
            }
        })
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
//功能切换
$(function () {
    var list=new Array();
    list[0]=".show-base";
    list[1]=".menu-base";
    list[2]=".restaurant-base";
    list[3]=".desk-base";
    list[4]=".book-base";
    list[5]=".comment-base";
    list[6]=".user-base";
    $(".left>div").click(function () {
        for (var i=0;i<7;i++)
        {
            $(list[i]).attr("style", "display:none");
        }
        $(list[$(this).index()]).removeAttr("style")
    })
})
//菜单显示
$(function () {
    $.ajax({
        type: "POST",
        url: "../API/page-admin.php",
        data: {
            opt: "menunum",
        },
        async: false,
        success: function (num) {
            var numobj = eval("(" + num + ")");
            for (var i=1;i<=numobj.num;i++)
            {
                $.ajax({
                    type: "POST",
                    url: "../API/page-admin.php",
                    data: {
                        opt: "menu",
                        optnum: i
                    },
                    async: false,
                    success: function (text) {
                        var text = eval("(" + text + ")");
                        //console.log(text)
                        var join="<div class=\""+decodeURIComponent(decodeURI(text.MENUID))+"\">\n" +
                            "            <span class=\"NAME\">菜品名称："+decodeURIComponent(decodeURI(text.NAME))+"</span>\n" +
                            "            <span class=\"SPECIES\">菜品分类："+decodeURIComponent(decodeURI(text.SPECIES))+"</span>\n" +
                            "            <span class=\"PRICE\">菜品价格：￥"+decodeURIComponent(decodeURI(text.PRICE))+"元</span>\n" +
                            "            <span class=\"PICTURE\">图片名称："+decodeURIComponent(decodeURI(text.PICTURE))+"</span>\n" +
                            "            <div class=\"change-div\">\n" +
                            "                <span class=\"fa fa-file-text-o\" name=\""+decodeURIComponent(decodeURI(text.MENUID))+"\"> 修改</span>\n" +
                            "                <span class=\"fa fa-times\" name=\""+decodeURIComponent(decodeURI(text.MENUID))+"\"> 删除</span>\n" +
                            "            </div>\n" +
                            "        </div>"
                        $(".menu-list").append(join)
                    }
                })
            }
        }
    })
})
//添加菜品
$(function () {
    $(".menu-insert").click(function () {
        $(".mask").removeAttr("style")
        $(".menu-insert-show").removeAttr("style")
        $(".menu-insert-list-name>input").val(null);
        $(".menu-insert-list-price>input").val(null);
        $(".menu-insert-list-picture>input").val(null);
        $(".file-submit").val(null)
    })
    $(".menu-insert-list-title").click(function () {
        $(".mask").attr("style", "display:none")
        $(".menu-insert-show").attr("style", "display:none")
    })
})
//菜品数据提交
function posttext(){
    if (!$(".file-submit").val()||$(".menu-insert-list-name>input").val().length==0&&$(".menu-insert-list-price>input").val().length==0
        &&$(".menu-insert-list-picture>input").val().length==0)
    {
        alert("输入框为空")
    }else
    {
        var reg = /^[0-9]+$/
        if (!reg.test($(".menu-insert-list-price>input").val()))
        {
            alert("价格错误")
        }else {
            var formData = new FormData();
            formData.append("file", $(".file-submit")[0].files[0]);
            $.ajax({
                url: "../API/insert-file.php",
                type: "POST",
                processData: false,
                contentType: false,
                xhrFields: {
                    withCredentials: true
                },
                "data": formData,
                success: function (data) {
                    var data = eval("(" + data + ")");
                    if (data.num == 0) {
                        alert("图片上传失败")
                    } else if (data.num == -1) {
                        alert("存在相同名称图片")
                    } else {
                        $.ajax({
                            type: "POST",
                            url: "../API/page-admin.php",
                            data: {
                                opt: "menuinsert",
                                species: $(".menu-insert-list-spices").find("option:selected").attr("class"),
                                name: encodeURI($(".menu-insert-list-name>input").val()),
                                price: encodeURI($(".menu-insert-list-price>input").val()),
                                picture: encodeURI($(".menu-insert-list-picture>input").val())
                            },
                            async: false,
                            success: function (text) {
                                var text = eval("(" + text + ")");
                                if (text.num == 0) {
                                    alert("插入失败")
                                } else {
                                    var join = "<div class=\"" + decodeURIComponent(decodeURI(text.num)) + "\">\n" +
                                        "            <span class=\"NAME\">菜品名称：" + decodeURIComponent(decodeURI(text.name)) + "</span>\n" +
                                        "            <span class=\"SPECIES\">菜品分类：" + decodeURIComponent(decodeURI(text.species)) + "</span>\n" +
                                        "            <span class=\"PRICE\">菜品价格：￥" + decodeURIComponent(decodeURI(text.price)) + "元</span>\n" +
                                        "            <span class=\"PICTURE\">图片名称：" + decodeURIComponent(decodeURI(text.picture)) + "</span>\n" +
                                        "            <div class=\"change-div\">\n" +
                                        "                <span class=\"fa fa-file-text-o\" name=\"" + decodeURIComponent(decodeURI(text.num)) + "\"> 修改</span>\n" +
                                        "                <span class=\"fa fa-times\" name=\"" + decodeURIComponent(decodeURI(text.num)) + "\"> 删除</span>\n" +
                                        "            </div>\n" +
                                        "        </div>"
                                    $(".menu-list").prepend(join)
                                    alert("添加成功")
                                    $(".mask").attr("style", "display:none")
                                    $(".menu-insert-show").attr("style", "display:none")
                                }
                            },
                            error: function () {
                                console.log("添加失败")
                            }
                        })
                    }
                },
                error: function (data) {
                    console.log("上传失败")
                }
            })
        }
    }
}
//菜品数据删除
$(function () {
    $(".menu-list").delegate(".fa-times","click",function () {
        var id=$(this).attr("name");
        $.ajax({
            type: "POST",
            url: "../API/page-admin.php",
            data: {
                opt: "menudelete",
                id: id
            },
            async: false,
            success:function (data) {
                var data = eval("(" + data + ")");
                if (data.num!=0)
                {
                    var id=".menu-list>."+data.num;
                    $(id).remove();
                    alert("删除成功")

                }else {
                    alert("删除失败")
                }
            }
        })
    })
})
//菜品数据修改
$(function () {
    $(".menu-list").delegate(".fa-file-text-o","click",function () {
        $(".MENUID").text($(this).attr("name"));
        var id =".menu-list>."+$(this).attr("name")+">.";
        var NAME=$(id+"NAME").text().split("：");
        var PRICE=$(id+"PRICE").text().split("￥");
        PRICE=PRICE[1].split("元")
        $(".mask").removeAttr("style")
        $(".menu-change-show").removeAttr("style")
        $(".menu-change-list-name>input").val(NAME[1]);
        $(".menu-change-list-price>input").val(PRICE[0]);
    })
    $(".menu-change-list-title").click(function () {
        $(".mask").attr("style", "display:none")
        $(".menu-change-show").attr("style", "display:none")
    })
})
//菜品信息更新
function updatetext() {
    var reg = /^[0-9]+$/
    if (!reg.test($(".menu-change-list-price>input").val()))
    {
        alert("价格错误")
    }else {
        $.ajax({
            type: "POST",
            url: "../API/page-admin.php",
            data: {
                opt: "menuupdate",
                species: $(".menu-change-list-spices").find("option:selected").attr("class"),
                name: encodeURI($(".menu-change-list-name>input").val()),
                price: encodeURI($(".menu-change-list-price>input").val()),
                menuid: encodeURI($(".MENUID").text()),
            },
            async: false,
            success: function (text) {
                var text = eval("(" + text + ")");
                if (text.menuid == 0) {
                    alert("修改失败")
                } else {
                    var id = ".menu-list>." + text.menuid + ">.";
                    var name = id + "NAME";
                    var species = id + "SPECIES";
                    var price = id + "PRICE";
                    $(name).text("菜品名称：" + decodeURIComponent(decodeURI(text.name)));
                    $(price).text("菜品价格：￥" + decodeURIComponent(decodeURI(text.price)) + "元");
                    $(species).text("菜品分类：" + decodeURIComponent(decodeURI(text.species)));
                    $(".mask").attr("style", "display:none")
                    $(".menu-change-show").attr("style", "display:none")
                    alert("修改成功")
                }
            },
            error: function () {
                console.log("修改失败")
            }
        })
    }
}
//餐厅信息
$(function () {
    $(".restaurant").click(function () {
        var list=new Array();
        list[0]="two";
        list[1]="four";
        list[2]="six";
        list[3]="eight";
        var time=new Array();
        time[0]="NINE";
        time[1]="ELEVEN";
        time[2]="THIRTEEN";
        time[3]="FIFTEEN";
        time[4]="SEVENTEEN";
        time[5]="NINETEEN";
        for (var i=0;i<4;i++)
        {
            $.ajax({
                type: "POST",
                url: "../API/page-admin.php",
                data: {
                    opt: "restaurant",
                    text:list[i]
                },
                async: false,
                success:function (text) {
                    var text = eval("(" + text + ")");
                    var ans="."+list[i]+">."+time[0]
                    $(ans).text(text.NINE);
                    ans="."+list[i]+">."+time[1]
                    $(ans).text(text.ELEVEN);
                    ans="."+list[i]+">."+time[2]
                    $(ans).text(text.THIRTEEN);
                    ans="."+list[i]+">."+time[3]
                    $(ans).text(text.FIFTEEN);
                    ans="."+list[i]+">."+time[4]
                    $(ans).text(text.SEVENTEEN);
                    ans="."+list[i]+">."+time[5]
                    $(ans).text(text.NINETEEN);
                }
            })
        }
    })
    $(function () {
        function fun(num){
            $.ajax({
                type: "POST",
                url: "../API/page-admin.php",
                data: {
                    opt : "changedesk",
                    desk:$('input[name="desk"]:checked').attr("class"),
                    time:$('input[name="time"]:checked').attr("class"),
                    num:num
                },
                async: false,
                success:function(ans) {
                    var ansobj =eval("("+ans+")");
                    if(ansobj.num==1)
                    {
                        alert("操作完成");
                        $(".mask").attr("style", "display:none")
                        $(".book-select").attr("style", "display:none")
                        $(".restaurant").click()
                    }else if (ansobj.num==-1)
                    {
                        alert("超出座位")
                    }else
                    {
                        alert("操作失败")
                    }
                }
            })
        }
        $(".restaurant-base-reduce").click(function () {
            $(".mask").removeAttr("style");
            $(".book-select").removeAttr("style");
            $(".book-span").text("客户结算")
        })
        $(".restaurant-base-increase").click(function () {
            $(".mask").removeAttr("style");
            $(".book-select").removeAttr("style");
            $(".book-span").text("客户就餐")
        })
        $(".book-pay").click(function () {
            if ($(".book-span").text()=="客户结算")
            {
                fun(1);
            }else {
                fun(-1);
            }

        })
        $(".book-title>p").click(function () {
            $(".mask").attr("style", "display:none")
            $(".book-select").attr("style", "display:none")
        })
    })
})
//订桌显示
$(function () {
    $(".desk-book").click(function () {
        $(".desk-list").html(null)
        $.ajax({
            type: "POST",
            url: "../API/page-admin.php",
            data: {
                opt: "desknum",
            },
            async: false,
            success: function (num) {
                var numobj = eval("(" + num + ")");
                for (var i=1;i<=numobj.num;i++)
                {
                    $.ajax({
                        type: "POST",
                        url: "../API/page-admin.php",
                        data: {
                            opt: "desk",
                            optnum: i
                        },
                        async: false,
                        success: function (text) {
                            var text = eval("(" + text + ")");
                            if ((decodeURIComponent(decodeURI(text.TYPE)).indexOf("(取消订桌)")!=-1)||(decodeURIComponent(decodeURI(text.TYPE)).indexOf("(完成订桌)")!=-1))
                            {
                                var join="<div class=\""+decodeURIComponent(decodeURI(text.ID))+"\">\n" +
                                    "            <span class=\"BOOK_ID\">订桌编号:"+decodeURIComponent(decodeURI(text.BOOK_ID))+"</span>\n" +
                                    "            <span class=\"USERNAME\">订桌用户:"+decodeURIComponent(decodeURI(text.USERNAME))+"</span>\n" +
                                    "            <span class=\"TYPE\">类型:"+decodeURIComponent(decodeURI(text.TYPE))+"</span>\n" +
                                    "            <span class=\"TIME\">时间:"+decodeURIComponent(decodeURI(text.TIME))+"</span>\n" +
                                    "            <div class=\"fa fa-check-square-o\" name=\""+decodeURIComponent(decodeURI(text.ID))+"\"> 已结单</div>\n" +
                                    "        </div>"
                                $(".desk-list").append(join)
                            }else {
                                var join="<div class=\""+decodeURIComponent(decodeURI(text.ID))+"\">\n" +
                                    "            <span class=\"BOOK_ID\">订桌编号:"+decodeURIComponent(decodeURI(text.BOOK_ID))+"</span>\n" +
                                    "            <span class=\"USERNAME\">订桌用户:"+decodeURIComponent(decodeURI(text.USERNAME))+"</span>\n" +
                                    "            <span class=\"TYPE\">类型:"+decodeURIComponent(decodeURI(text.TYPE))+"</span>\n" +
                                    "            <span class=\"TIME\">时间:"+decodeURIComponent(decodeURI(text.TIME))+"</span>\n" +
                                    "            <div class=\"fa fa-check-square-o\" name=\""+decodeURIComponent(decodeURI(text.ID))+"\"> 结单</div>\n" +
                                    "        </div>"
                                $(".desk-list").append(join)
                            }
                        }
                    })
                }
            }
        })
    })
    function fun(ptype,ptime)
    {
        if (ptype==encodeURI("(完成订桌)两人桌"))
        {
            ptype='two';
        }else if (ptype==encodeURI("(完成订桌)四人桌"))
        {
            ptype='four';
        }else if (ptype==encodeURI("(完成订桌)六人桌"))
        {
            ptype='six';
        }else if (ptype==encodeURI("(完成订桌)大包厢"))
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
                    alert("操作完成")
                }else
                {
                    console.log("修改失败")
                }
            }
        })
    }
    $(".desk-list").delegate(".fa-check-square-o","click",function () {
        var id=$(this).attr("name")
        if(!($(this).text().indexOf("已")!=-1))
        {
            $.ajax({
                type:"POST",
                url: "../API/page-admin.php",
                data :{
                    opt:"cancel-desk",
                    id:id
                },
                async: false,
                success:function (text) {
                    var textobj =eval("("+text+")");
                    if (textobj.num==1)
                    {
                        fun(textobj.TYPE,textobj.TIME)
                        $(".desk-book").click();
                    }
                }
            })
        }
    })
})
//订单管理
$(function () {
    $(".menu-book").click(function () {
        $(".book-list").html(null)
        $.ajax({
            type: "POST",
            url: "../API/page-admin.php",
            data: {
                opt: "booknum",
            },
            async: false,
            success: function (num) {
                var numobj = eval("(" + num + ")");
                for (var i = 1; i <= numobj.num; i++) {
                    $.ajax({
                        type: "POST",
                        url: "../API/page-admin.php",
                        data: {
                            opt: "book",
                            optnum: i
                        },
                        async: false,
                        success: function (text) {
                            var text = eval("(" + text + ")");
                            //console.log(text)
                            if ((decodeURIComponent(decodeURI(text.TYPE)).indexOf("(取消订单)")!=-1)||(decodeURIComponent(decodeURI(text.TYPE)).indexOf("(完成订单)")!=-1))
                            {
                                var join="<div class=\""+decodeURIComponent(decodeURI(text.ID))+"\">\n" +
                                    "            <span class=\"MENU_ID\">订单编号:"+decodeURIComponent(decodeURI(text.MENU_ID))+"</span>\n" +
                                    "            <span class=\"MENU_USERNAME\">订单用户:"+decodeURIComponent(decodeURI(text.USERNAME))+"</span>\n" +
                                    "            <span class=\"MENU_NUM\">订单价格:"+decodeURIComponent(decodeURI(text.MENU_NUM))+"</span>\n" +
                                    "            <span class=\"MENU_TYPE\">订单类型:"+decodeURIComponent(decodeURI(text.TYPE))+"</span>\n" +
                                    "            <div class=\"fa fa-check-square-o\" name=\""+decodeURIComponent(decodeURI(text.ID))+"\"> 已结单</div>\n" +
                                    "            <div class=\"fa fa-buysellads\" name=\""+decodeURIComponent(decodeURI(text.ID))+"\"> 详细</div>\n" +
                                    "        </div>"
                                $(".book-list").append(join)
                            }else {
                                var join="<div class=\""+decodeURIComponent(decodeURI(text.ID))+"\">\n" +
                                    "            <span class=\"MENU_ID\">订单编号:"+decodeURIComponent(decodeURI(text.MENU_ID))+"</span>\n" +
                                    "            <span class=\"MENU_USERNAME\">订单用户:"+decodeURIComponent(decodeURI(text.USERNAME))+"</span>\n" +
                                    "            <span class=\"MENU_NUM\">订单价格:"+decodeURIComponent(decodeURI(text.MENU_NUM))+"</span>\n" +
                                    "            <span class=\"MENU_TYPE\">订单类型:"+decodeURIComponent(decodeURI(text.TYPE))+"</span>\n" +
                                    "            <div class=\"fa fa-check-square-o\" name=\""+decodeURIComponent(decodeURI(text.ID))+"\"> 结单</div>\n" +
                                    "            <div class=\"fa fa-buysellads\" name=\""+decodeURIComponent(decodeURI(text.ID))+"\"> 详细</div>\n" +
                                    "        </div>"
                                $(".book-list").append(join)
                            }
                        }
                    })
                }
            }
        })
    })
    $(".book-list").delegate(".fa-check-square-o","click",function () {
        var id=$(this).attr("name")
        if(!($(this).text().indexOf("已")!=-1))
        {
            $.ajax({
                type:"POST",
                url: "../API/page-admin.php",
                data :{
                    opt:"cancel-book",
                    id:id
                },
                async: false,
                success:function (text) {
                    var textobj =eval("("+text+")");
                    if (textobj.num==1)
                    {
                        alert("操作完成")
                        $(".menu-book").click();
                    }
                }
            })
        }
    })
    $(".book-list").delegate(".fa-buysellads","click",function () {
        $(".mask-text").html(null)
        var id=$(this).attr("name")
        $(".book_menu-select").removeAttr("style")
        $(".mask").removeAttr("style")
        $.ajax({
            type: "POST",
            url: "../API/orderapi.php",
            data: {
                opt : "findtext",
                optnum : id
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
//评论
$(function () {
    $(".comment-info").click(function () {
        $(".comment-list").html(null);
        $.ajax({
            type: "GET",
            url: "../API/indexshowapi.php",
            data: {
                opt : "findnum"
            },
            async: false,
            success: function(ans){
                var numobj =eval("("+ans+")");
                if (numobj<=0)
                {
                    console.log("数据库无数据");
                    return false;
                }
                for (var i=1;i<=numobj.num;i++)
                {
                    $.ajax({
                        type: "GET",
                        url: "../API/indexshowapi.php",
                        data: {
                            opt : "commenttext",
                            optnum : i
                        },
                        async: false,
                        success:function (text) {
                            var text =eval("("+text+")");
                            //{USERID: 1, NAME: "吴伟", TEXT: "3188909413", TIME: "2020-06-19", DING: 0}
                            var join="<div class=\""+decodeURIComponent(decodeURI(text.USERID))+"\">\n" +
                                "            <span class=\"COMMENT_NAME\">评论用户: "+decodeURIComponent(decodeURI(text.NAME))+"</span>\n" +
                                "            <span class=\"COMMENT_TEXT\">评论内容: "+decodeURIComponent(decodeURI(text.TEXT))+"</span>\n" +
                                "            <span class=\"COMMENT_TIME\">评论时间: "+decodeURIComponent(decodeURI(text.TIME))+"</span>\n" +
                                "            <span class=\"COMMENT_DING\">评论点赞: "+decodeURIComponent(decodeURI(text.DING))+"</span>\n" +
                                "            <div class=\"fa fa-times\" name=\""+decodeURIComponent(decodeURI(text.USERID))+"\"> 删除</div>\n" +
                                "        </div>"
                            $(".comment-list").prepend(join);
                        },
                        error:function(){ //失败的函数
                            console.log("数据库无数据");
                        }
                    })
                }
            },
            error:function(){ //失败的函数
                console.log("数据库无数据");
            }
        })
    })
    $(".comment-list").delegate(".fa-times","click",function () {
        var id =$(this).attr("name");
        $.ajax({
            type: "POST",
            url: "../API/orderapi.php",
            data: {
                opt: "delete",
                optid: id
            },
            async: false,
            success: function (ans) {
                var ansobj = eval("(" + ans + ")");
                if (ansobj.num==1) {
                    alert("删除成功")
                    $(".comment-info").click()
                } else {
                    alert("删除失败")
                }
            }
        })
    })
})
//信息修改
$(function () {
    $(".people-info").click(function () {
        $(".user-list").html(null);
        $.ajax({
            type: "POST",
            url: "../API/page-admin.php",
            data: {
                opt : "usernum"
            },
            async: false,
            success: function(ans){
                var numobj =eval("("+ans+")");
                if (numobj.num<=0)
                {
                    console.log("数据库无数据");
                    return false;
                }
                for (var i=1;i<=numobj.num;i++)
                {
                    $.ajax({
                        type: "POST",
                        url: "../API/page-admin.php",
                        data: {
                            opt : "usertext",
                            optnum : i
                        },
                        async: false,
                        success:function (text) {
                            var text =eval("("+text+")");
                            if (text.MANAGEMENT==1)
                            {
                                var join="<div class=\""+text.ID+"\">\n" +
                                    "            <span class=\"USER_USERNAME\">管理员: "+decodeURIComponent(decodeURI(text.USERNAME))+"</span>\n" +
                                    "            <span class=\"USER_PASSWORD\">密码: "+decodeURIComponent(decodeURI(text.PASSWORD))+"</span>\n" +
                                    "            <span class=\"USER_NAME\">用户名: "+decodeURIComponent(decodeURI(text.NAME))+"</span>\n" +
                                    "            <span class=\"USER_PHONE\">电话: "+decodeURIComponent(decodeURI(text.PHONE))+"</span>\n" +
                                    "            <span class=\"USER_ADDRESS\">地址: "+decodeURIComponent(decodeURI(text.ADDRESS))+"</span>\n" +
                                    "            <div class=\"fa fa-times\" name=\""+text.ID+"\"> 删除</div>\n" +
                                    "            <div class=\"fa fa-file-text-o\" name=\""+text.ID+"\"> 修改</div>\n" +
                                    "        </div>"
                                $(".user-list").append(join);
                            }else {
                                var join="<div class=\""+text.ID+"\">\n" +
                                    "            <span class=\"USER_USERNAME\">账户: "+decodeURIComponent(decodeURI(text.USERNAME))+"</span>\n" +
                                    "            <span class=\"USER_PASSWORD\">密码: "+decodeURIComponent(decodeURI(text.PASSWORD))+"</span>\n" +
                                    "            <span class=\"USER_NAME\">用户名: "+decodeURIComponent(decodeURI(text.NAME))+"</span>\n" +
                                    "            <span class=\"USER_PHONE\">电话: "+decodeURIComponent(decodeURI(text.PHONE))+"</span>\n" +
                                    "            <span class=\"USER_ADDRESS\">地址: "+decodeURIComponent(decodeURI(text.ADDRESS))+"</span>\n" +
                                    "            <div class=\"fa fa-times\" name=\""+text.ID+"\"> 删除</div>\n" +
                                    "            <div class=\"fa fa-file-text-o\" name=\""+text.ID+"\"> 修改</div>\n" +
                                    "        </div>"
                                $(".user-list").append(join);
                            }

                        },
                        error:function(){ //失败的函数
                            console.log("数据库无数据");
                        }
                    })
                }
            },
            error:function(){ //失败的函数
                console.log("数据库无数据");
            }
        })
    })
    $(".user-list").delegate(".fa-times","click",function () {
        var id=$(this).attr("name");
        if(id==1)
        {
            alert("初始管理员无法删除")
        }else {
            $.ajax({
                type: "POST",
                url: "../API/page-admin.php",
                data: {
                    opt: "deleteuser",
                    id: id
                },
                success:function (text) {
                    var text =eval("("+text+")");
                    if (text.num==1)
                    {
                        alert("删除完成");
                        id=".user-list>."+id+">.";
                        var USER_USERNAME=$(id+"USER_USERNAME").text().split(": ");
                        if (USER_USERNAME[1]==$(".admin-user").text()||$(".menu-change-list-man").find("option:selected").attr("class")==0)
                        {
                            document.cookie = "username= ; expires=" +(new Date(0)).toUTCString();;
                            document.cookie = "password= ; expires=" +(new Date(0)).toUTCString();;
                            window.location.href = "index.html";
                        }
                        $(".people-info").click()
                    }else {
                        alert("删除失败");
                    }
                }
            })
        }
    })
    $(".user-list").delegate(".fa-file-text-o","click",function () {
        var id=$(this).attr("name");
        $(".user_id").text(id);
        id=".user-list>."+id+">.";
        var USER_USERNAME=$(id+"USER_USERNAME").text().split(": ");
        var USER_PASSWORD=$(id+"USER_PASSWORD").text().split(": ");
        var USER_NAME=$(id+"USER_NAME").text().split(": ");
        var USER_PHONE=$(id+"USER_PHONE").text().split(": ");
        var USER_ADDRESS=$(id+"USER_ADDRESS").text().split(": ");
        $(".mask").removeAttr("style")
        $(".user-change-show").removeAttr("style")
        $(".user-change-list-user").html("用户账号&nbsp&nbsp&nbsp&nbsp&nbsp"+USER_USERNAME[1]);
        $(".user-change-list-password>input").val(USER_PASSWORD[1])
        $(".user-change-list-name>input").val(USER_NAME[1])
        $(".user-change-list-phone>input").val(USER_PHONE[1])
        $(".user-change-list-address>input").val(USER_ADDRESS[1])
        if (id==".user-list>.1>.")
        {
            $(".menu-change-list-man").html("管理权限&nbsp&nbsp&nbsp&nbsp&nbsp管理员");
        }else
        {
            $(".menu-change-list-man").html(
                "管理权限&nbsp"+
                "<select placeholder=\"请选择权限\">"+
                    "<option class=\"0\">用户</option>"+
                    "<option class=\"1\">管理员</option>"+
                "</select>");
        }
    })
})
function updateuser() {
    var password = $(".user-change-list-password>input").val();
    var reg = new RegExp(/[0-9a-zA-Z]|/);
    if (password.length<8)
    {
        alert("密码长度必须大于七位")
    }else if (!reg.test(password))
    {
        alert("密码只允许字母与数字")
    }else {
        var man=1;
        if ($(".user_id").text()!="1")
        {
            man=$(".menu-change-list-man").find("option:selected").attr("class")
        }
        $.ajax({
            type: "POST",
            url: "../API/page-admin.php",
            data: {
                opt: "changeuser",
                id: $(".user_id").text(),
                password: $(".user-change-list-password>input").val(),
                name: encodeURI($(".user-change-list-name>input").val()),
                phone: encodeURI($(".user-change-list-phone>input").val()),
                address: encodeURI($(".user-change-list-address>input").val()),
                man:man
            },
            success:function (text) {
                var text =eval("("+text+")");
                if (text.num==1)
                {
                    alert("修改完成");
                    var id=".user-list>."+$(".user_id").text()+">.";
                    var USER_PASSWORD=$(id+"USER_PASSWORD").text().split(": ");
                    var USER_USERNAME=$(id+"USER_USERNAME").text().split(": ");
                    if (USER_USERNAME[1]==$(".admin-user").text()&&(USER_PASSWORD[1]!=$(".user-change-list-password>input").val()||man==0))
                    {
                        document.cookie = "username= ; expires=" +(new Date(0)).toUTCString();;
                        document.cookie = "password= ; expires=" +(new Date(0)).toUTCString();;
                        window.location.href = "index.html";
                    }
                    $(".mask").attr("style", "display:none")
                    $(".user-change-show").attr("style", "display:none")
                    $(".people-info").click()
                }else {
                    alert("修改失败");
                }
            }
        })
    }
}
//显示主页
$(function () {
    $(".index-info").click(function () {
        $.ajax({
            type: "POST",
            url: "../API/page-admin.php",
            data: {
                opt: "indexinfo",
            },
            success: function (text) {
                var text = eval("(" + text+ ")");
                $(".today-menu").text(text["today-menu"])
                $(".win-menu").text(text["win-menu"])
                $(".sum-menu").text(text["sum-menu"])
                $(".today-book").text(text["today-book"])
                $(".win-book").text(text["win-book"])
                $(".sum-book").text(text["sum-book"])
                $(".sum-user").text(text["sum-user"])
                $(".sum-comment").text(text["sum-comment"])
            }
        })
    })
    $(".index-info").click()
})
//bug窗口修复
$(function () {
    $(".fa-close").click(function () {
        $(".mask").attr("style", "display:none")
        $(".menu-insert-show").attr("style", "display:none")
        $(".menu-change-show").attr("style", "display:none")
        $(".book-select").attr("style", "display:none")
        $(".book_menu-select").attr("style", "display:none")
        $(".user-change-show").attr("style", "display:none")
    })
})

