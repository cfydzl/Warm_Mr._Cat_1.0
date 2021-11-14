//统计图
$(function () {
    function makeSVG(tag, attrs) {
        var el= document.createElementNS('http://www.w3.org/2000/svg', tag);
        for (var k in attrs)
            el.setAttribute(k, attrs[k]);
        return el;
    }
    var name=new Array("two","four","six","eight")
    for (var i=0;i<name.length;i++)
    {
        $.ajax({
            type:"get",
            url: "../API/restaurantapi.php",
            data :{
                opt:"information",
                text:name[i]
            },
            async: false,
            success:function (text) {
                var objtext=eval("("+text+")");
                var num=new Array(objtext.NINE,objtext.ELEVEN,objtext.THIRTEEN,objtext.FIFTEEN,objtext.SEVENTEEN,objtext.NINETEEN)
                for (var j=0;j<num.length;j++)
                {
                    var circle= makeSVG('rect', {y: ((6-num[j])*45+50), x: 100+(j*180), width:20, height: 320-((6-num[j])*45+50), 'stroke-width': 2});
                    document.getElementById(name[i]).appendChild(circle);
                }
            }
        })
    }
})