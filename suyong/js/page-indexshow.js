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
		if (username!="visitor")
		{
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
					}else if (textobj.num == "2")
					{
						window.location.href = "admin.html";
					}
				}
			})
		}
	}
})
//评论区
$(function () {
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
						var textobj =eval("("+text+")");
						//{USERID: 1, NAME: "吴伟", TEXT: "3188909413", TIME: "2020-06-19", DING: 0}
						var join="<div class=\"bottom-line\">"+
									"<img class=\"bottom-line-picture\" src=\"../img/touxiang.png\">"+
									"<div class=\"comment\">"+
										"<div class=\"comment-time\">"+textobj.TIME+"</div>"+
										"<div class=\"comment-name\">"+decodeURIComponent(decodeURI(textobj.NAME))+"</div>"+
										"<img class=\"comment-name-picture\" src=\"../img/3.png\"/>"+
										"<div class=\"comment-text\">"+decodeURIComponent(decodeURI(textobj.TEXT))+"</div>"+
										"<div class=\"comment-zan\">"+
											"<div style=\"display: none\">"+textobj.USERID+"</div>"+
											"<div class=\"fa fa-thumbs-o-up\"> &nbsp</div>"+
											"<span class=\"select\">"+textobj.DING+"</span>"+
										"</div>"+
								"</div>"+
							"</div>";
						$(".bottom").prepend(join);
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
//推荐菜单
$(function () {
	$.ajax({
		type: "GET",
		url: "../API/menuapi.php",
		data: {
			opt : "menunum",
			name: "%E6%8E%A8%E8%8D%90"
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
						name: "%E6%8E%A8%E8%8D%90"
					},
					async: false,
					success:function (text) {
						var textobj =eval("("+text+")");
						var join="<div class=\"menu-picture\">" +
									"<img src=\""+decodeURIComponent(decodeURI(textobj.PICTURE))+"\" width=\"192px\" height=\"108px\"/>" +
									"<div class=\"menu-infor\">" +
										"<div>"+decodeURIComponent(decodeURI(textobj.NAME))+"(五星推荐)</div>" +
										"<img src=\"../img/3.png\" width=\"80px\" height=\"14px\"/>" +
										"<div class=\"menu-peace\">" +
											"￥"+decodeURIComponent(decodeURI(textobj.PRICE))+"元" +
										"</div>" +
									"</div>" +
								"</div>"
						$(".menu-text").append(join);
					},
					error:function(){ //失败的函数
						console.log("数据库无数据");
					}
				})
			}
		}
	})
})
//抢购支付
$(function(){
	$(".buy-sale").click(function () {
		var username="username";
		var password="password";
		var cookie = document.cookie;
		var reg = new RegExp("(^|\\s)" + username + "=([^;]+)(;|$)");
		var username = cookie.match(reg)[2];
		reg = new RegExp("(^|\\s)" + password + "=([^;]+)(;|$)");
		var password = cookie.match(reg)[2];
		if (username!="visitor") {
			$(".mask").removeAttr("style")
		}else {
			alert("请先前往个人中心登录")
		}
	})
	$(".mask>div>div>p").click(function () {
		$(".mask").attr("style","display:none");
	})
	$(".book-submit").click(function () {
		alert("支付完成");
		window.location.href="indexshow.html";
	})
});
//点赞
$(function () {
	$(".bottom").delegate(".comment-zan>div","click",function () {
		var now=$(this).next();
		$.ajax({
			type: "GET",
			url: "../API/indexshowapi.php",
			data: {
				opt : "changezan",
				optnum: $(this).prev().text()
			},
			async: false,
			success:function () {
				now.text(parseInt(now.text(),10)+1)
			},
			error:function () {
				console.log("点赞失败")
			}

		})
	})
})