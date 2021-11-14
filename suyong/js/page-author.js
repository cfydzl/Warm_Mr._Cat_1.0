//页面定位
$(function () {
    $(".close>div").click(function () {
        if ($(this).text()=='我的信息')
        {
            window.scrollTo({
                top:681,
                behavior:'smooth'
            })
        }else if ($(this).text()=='我的教育')
        {
            window.scrollTo({
                top:931,
                behavior:'smooth'
            })
        }else if ($(this).text()=='我的事迹')
        {
            window.scrollTo({
                top:1226,
                behavior:'smooth'
            })
        }else if ($(this).text()=='我的介绍')
        {
            window.scrollTo({
                top:1680,
                behavior:'smooth'
            })
        }else if ($(this).text()=='我的照片')
        {
            window.scrollTo({
                top:2275,
                behavior:'smooth'
            })
        }else if ($(this).text()=='我的动画')
        {
            window.scrollTo({
                top:2655,
                behavior:'smooth'
            })
        }
    })
})
//图片滚动
$(function () {
    var offset = 0;
    var timer
    function autoPlay() {
        timer = setInterval(function () {
            offset += -10;
            if (offset<=-2970)
                offset=0
            $("ul").css("marginLeft",offset)
        },60)
    }
    autoPlay()
    $("li").hover(function () {
        clearInterval(timer);
        $(this).siblings().fadeTo(100,0.5)
        $(this).fadeTo(100,1)
    },function () {
        autoPlay()
        $("li").fadeTo(100,1)
    })
})
//切换歌曲
$(function () {
    var num=1;
    var music=Array();
    music[2]="../music/耿.m4a";
    music[1]="../music/辞九门回忆.mp3";
    music[0]="../music/是风动.m4a";
    var audio = document.getElementById('music1');
    $(".music-button>div").click(function () {
        if ($(this).attr('class')=="fa fa-play select")
        {
            if(audio.paused)
            {
                audio.play();
                $(this).removeClass("fa fa-play select");
                $(this).addClass("fa fa-pause select")
            }
        }else if ($(this).attr('class')=="fa fa-pause select")
        {
            if(!audio.paused)
            {
                audio.pause();
                $(this).removeClass("fa fa-pause select");
                $(this).addClass("fa fa-play select")
            }
        }else if ($(this).attr('class')=="fa fa-stop select")
        {
            if(!audio.paused)
            {
                audio.pause();
                audio.currentTime = 0;
                $(this).prev().removeClass("fa fa-pause select");
                $(this).prev().addClass("fa fa-play select")
            }else {
                audio.currentTime = 0;
            }
        }else if ($(this).attr('class')=="fa fa-step-forward select")
        {
            if(audio.paused)
            {
                audio.pause();
                num = (num+1)%3;
                $("source").attr("src",music[num]);
                audio.load();
                audio.play();
                $(this).prev().prev().removeClass("fa fa-play select");
                $(this).prev().prev().addClass("fa fa-pause select")
            }else
            {
                audio.pause();
                audio.currentTime = 0;
                num = (num+1)%3;
                $("source").attr("src",music[num]);
                audio.load();
                audio.play();
            }
            var change =music[num].substr(9).slice(0,-4);
            $(".music-name").text(change)
        }else if ($(this).attr('class')=="fa fa-step-backward select")
        {
            if(audio.paused)
            {
                audio.pause();
                num = (num+3-1)%3;
                $("source").attr("src",music[num]);
                audio.load();
                audio.play();
                $(this).next().removeClass("fa fa-play select");
                $(this).next().addClass("fa fa-pause select")
            }else
            {
                audio.pause();
                audio.currentTime = 0;
                num = (num+3-1)%3;
                $("source").attr("src",music[num]);
                audio.load();
                audio.play();
            }
            var change =music[num].substr(9).slice(0,-4);
            $(".music-name").text(change)
        }
    })
    //歌单
    $(".fa-align-left").click(function () {
        $(".music-list").slideDown(600);
    })
    $(".fa-close").click(function () {
        $(".music-list").slideUp(600);
    })
    $(".music-list-name>div").mouseenter(function () {
        var join = "<div class=\"fa fa-play select\"></div>";
        $(this).append(join);
    })
    $(".music-list-name>div").mouseleave(function () {
        $(this).children("div").remove();
    })
    $(".music-list-name>div>div").hover(function (e) {
        e.stopPropagation();
    })
    $(".music-list-name").delegate(".fa-play","click",function () {
        num = $(this).parent().attr("class");
        if(audio.paused)
        {
            audio.pause();
            $("source").attr("src",music[num]);
            audio.load();
            audio.play();
            $("#special").removeClass("fa fa-play select");
            $("#special").addClass("fa fa-pause select")
        }else
        {
            audio.pause();
            audio.currentTime = 0;
            $("source").attr("src",music[num]);
            audio.load();
            audio.play();
        }
        var change =music[num].substr(9).slice(0,-4);
        $(".music-name").text(change)
        $(".fa-volume-up").remove();
        $(this).parent().append("<span class=\"fa fa-volume-up select\"></span>")
    })
})