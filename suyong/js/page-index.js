//自动登录
$(function () {
    if (document.cookie.indexOf("username=") == -1) {
        console.log("没有用户名")
    } else {
        var username="username";
        var password="password";
        var cookie = document.cookie;
        var reg = new RegExp("(^|\\s)" + username + "=([^;]+)(;|$)");
        var username = cookie.match(reg)[2];
        reg = new RegExp("(^|\\s)" + password + "=([^;]+)(;|$)");
        var password = cookie.match(reg)[2];
        if (username=="visitor")
        {
            window.location.href = "indexshow.html";
        }else {
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
                    if (textobj.num == "1") {
                        window.location.href = "indexshow.html";
                    }else if (textobj.num == "2")
                    {
                        window.location.href = "admin.html";
                    }
                }
            })
        }
    }
})
//登录
$(function () {
    $(".button").click(function () {
        var username = $(".user input").val();
        var password = $(".password input").val();
        $.ajax({
            type: "POST",
            url: "../information/user-information.php",
            data: {
                opt: "finduser",
                username: username,
                password: password
            },
            async: false,
            success: function (text) {
                var textobj = eval("(" + text + ")");
                if (textobj.num == "1") {
                    var data = new Date().getTime();
                    var newD = new Date(data + 3 * 24 * 60 * 60 * 1000)
                    document.cookie = "username=" + username + "; expires=" + newD.toUTCString();
                    document.cookie = "password=" + password + "; expires=" + newD.toUTCString();
                    window.location.href = "indexshow.html";
                } else if (textobj.num == "2")
                {
                    var data = new Date().getTime();
                    var newD = new Date(data + 3 * 24 * 60 * 60 * 1000)
                    document.cookie = "username=" + username + "; expires=" + newD.toUTCString();
                    document.cookie = "password=" + password + "; expires=" + newD.toUTCString();
                    window.location.href = "admin.html";
                }else {
                    alert("用户名不存在或密码错误")
                }
            }
        })
    })
})
//游客登陆
$(function () {
    $(".visitor").click(function () {
        var username="visitor";
        var password="visitor";
        var data = new Date().getTime();
        var newD = new Date(data + 3 * 24 * 60 * 60 * 1000)
        document.cookie = "username=" + username + "; expires=" + newD.toUTCString();
        document.cookie = "password=" + password + "; expires=" + newD.toUTCString();
        window.location.href = "indexshow.html";
    })
})
//切换页面
$(function () {
    $(".register").click(function () {
        $(".show").attr("style", "display:none");
        $(".register-show").removeAttr("style")
    })
    $(".return").click(function () {
        $(".register-show").attr("style", "display:none");
        $(".show").removeAttr("style")
    })
})
//注册点击事件
$(function () {
    $(".register-button").click(function () {
        var username = $(".register-show .user input").val();
        var password = $(".register-show .password input").val();
        var repassword = $(".repassword input").val();
        var reg = new RegExp(/[0-9a-zA-Z]|/);
        if (password != repassword || password.length == 0 || username.length == 0) {
            alert("用户名与密码为空或密码不同")
        } else if (password.length < 8 || username.length < 8) {
            alert("密码与用户长度必须均大于7位")
        } else if (!reg.test(password) || !reg.test(username)) {
            alert("用户与密码只允许字母与数字")
        } else if (/.*[\u4e00-\u9fa5]+.*$/.test(username))
        {
            alert("只允许数字与字母")
        }else {
            $.ajax({
                type: "POST",
                url: "../information/user-information.php",
                data: {
                    opt: "login",
                    username: username,
                    password: password
                },
                async: false,
                success: function (text) {
                    var textobj = eval("(" + text + ")");
                    if (textobj.num == "1") {
                        alert("注册成功")
                        var data = new Date().getTime();
                        var newD = new Date(data + 3 * 24 * 60 * 60 * 1000)
                        document.cookie = "username=" + username + "; expires=" + newD.toUTCString();
                        document.cookie = "password=" + password + "; expires=" + newD.toUTCString();
                        window.location.href = "center.html";
                    } else {
                        alert("用户名已存在")
                    }
                }
            })
        }
    })
})