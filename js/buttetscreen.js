var arr = [];//用于保存弹幕数据的数组；
var sendflag = false; //持续发送弹幕
$(document).ready(function(){
    var showscreen = $("#container");//弹幕墙div

    var showHeight = showscreen.height();//弹幕墙div的高度
    var showWidth = showscreen.width();//弹幕墙div的宽度

    var topMin = showscreen.offset().top;//弹幕墙顶部离页面顶端距离 50
    var topMax = topMin+showHeight;//弹幕墙底部离页面顶端距离
    
    var leftMin = showscreen.offset().left;//弹幕墙左边框离页面左边框的距离 108
    var leftMax = leftMin+showWidth;//弹幕墙右边框离页面左边框的距离

    //按回车发送
    $("input").keydown(function(event){
        if(event.keyCode == 13){
                $("#sent").trigger("click");//trigger触发被选元素的指定事件类型，触发#send事件的click类型
        }
    })

    //获取随机颜色
    var getRandomColor = function(){
        return '#'+('00000'+(Math.random()*0xffffff <<0).toString(16)).substr(-6);
    }

    //点击发射按钮事件
    $("#sent").click(function(){
        var text = $("#message").val();//获取用户输入的待发送弹幕
        $("#message").val("");//清空弹幕发送区
        move_text(text);
    })

     var move_text = function(text){
        var obj=$("<div>"+text+"</div>");
        arr.push(obj);//将数据存入实现定义好的用于保存弹幕数据的数组
        showscreen.append(obj);
         var top = Math.random()*(showHeight-obj.height()); //一开始的高度
         obj.css({
             color:getRandomColor(),    //颜色
             position:"relative",       //不脱离文件流，会被父元素遮挡
             height:25,                 // 调整弹幕高度
             margin:"-25px 0px",        //让弹幕可重叠，数值等于-height
             left:showWidth,        //初始向右偏移位置，加100是解决移动刚开始时的速度慢问题
             top:top+20.67,             //初始向下偏移位置
         });

         //控制弹幕速度,time越小则越快
         var time = 10000 + Math.random()*10000;
         //将弹幕移动到某个位置
         obj.animate({
             left:-obj.width()+"px"
         },time,function(){
             //删除弹幕
             obj.remove();
         });
     };

    //清屏按钮点击事件
    $("#clear").click(function(){
        arr.forEach(element => {
            element.remove();
        });
    });
     

    //很多弹幕点击事件
    $("#sendmuch").click(function(){
        sendflag = !sendflag;
        if(sendflag){
            $("#sendmuch").html("关闭弹幕");
        }else{
            $("#sendmuch").html("开启弹幕");
             //清屏
             arr.forEach(element => {
                element.remove();
            });
        }
        autosend();
    });

    var autosend = function(){
        if(!sendflag){
            return;
        }else{
            var index = parseInt(Math.random()*str_add.length);
            move_text(str_add[index]);
            setTimeout(autosend, 60);   //可以通过调整setTimeout时间控制弹幕密度
        }
    }
})

//自动发送的弹幕列表
// var str_add = [
//     "嘤嘤嘤",
//     "IG牛逼",
//     "HelloWorld！",
//     "Java是世界上最好的编程语言",
//     "哔哩哔哩 (゜-゜)つロ 干杯~-bilibili",
//     "2333333333",
//     "爱我中华",
//     "(｡･∀･)ﾉﾞ嗨",
//     "💕",
//     "🤞比心",
//     "🚐",
// ];