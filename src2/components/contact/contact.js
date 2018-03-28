function initialize(params) {
    // 联系验证
    $("button[type='submit']").on("click", function() {
        var oForm = $("form");
        var sName = $.trim($("#user-name").val());
        var sContact = $.trim($("#suer-contact").val());
        var sMsg = $.trim($(".msg textarea").val());
        var oPrompt = $(".prompt");
        var aCheck = [];
        var sPrompt = "";

        var re1 = /^1\d{10}$/,
            re2 = /^0\d{2,3}-?\d{7,8}$/,
            re3 = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;

        if (sName == "") {
            aCheck.push("请填写姓名");
        }

        if (re1.test(sContact) || re2.test(sContact) || re3.test(sContact)) {} else {
            aCheck.push("联系方式必须为手机号码 | 电话号码（区号+号码）| 邮箱");
        }

        if (sMsg == "") {
            aCheck.push("请填写留言内容");
        }
        if (aCheck.length) {
            for (var i = 0; i < aCheck.length; i++) {
                sPrompt += "<span style='color:#f00'>" + aCheck[i] + "</span>";
            }
            oPrompt.html(sPrompt);
            return false;
        }
        oPrompt.html("");
    });

    // 百度地图API功能

    function loadJScript() {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "http://api.map.baidu.com/api?v=2.0&ak=Ncom5IFiBPttL91o9xcRzLK3GCefuxSa&callback=init";
        document.body.appendChild(script);
    }

    window.init = function() {
        var map = new BMap.Map("l-map");
        var point = new BMap.Point(120.152169, 30.308917);
        var marker = new BMap.Marker(point); // 创建标注
        map.addOverlay(marker); // 将标注添加到地图中
        map.centerAndZoom(point, 15);
        var opts = {
            width: 200, // 信息窗口宽度
            height: 100, // 信息窗口高度
            title: "意合设计" // 信息窗口标题
        }
        var infoWindow = new BMap.InfoWindow("地址：杭州市拱墅区长乐路29号元谷创意园长乐园2幢208", opts); // 创建信息窗口对象 
        map.openInfoWindow(infoWindow, point); //开启信息窗口
        marker.addEventListener("click", function() {
            map.openInfoWindow(infoWindow, point); //开启信息窗口
        }); //启用滚轮放大缩小
    };
    loadJScript();

}
module.exports = {
    init: initialize
}
