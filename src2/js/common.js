$(function() {
    // 导航至顶
    var oHeadH1 = $("#header h1");
    var oNav = $("#header nav");
    var nNavTop = oNav.offset().top;
    $(window).scroll(function() {
        if ($(this).scrollTop() > nNavTop) {
        	oHeadH1.css("padding-bottom","60px");
            oNav.addClass("shadow");
        }else{
        	oHeadH1.css("padding-bottom","0");
        	oNav.removeClass("shadow");
        }
    });

    // 返回顶部
    $(".back-top").on("click", function() {
        $("body,html").animate({
            scrollTop: 0
        }, 300);
    });
});
