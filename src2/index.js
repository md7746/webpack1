// reference css
require('commoncss');
require('indexcss');


var pageDatas = {
    params: {}, // params
    defaultRoute: 'about', // default Route
    isDelay: true //开始延迟一次滚动
};

function initMenu() {

    var modName = pageDatas.defaultRoute;


    $("#header nav a").each(function(e) {
        if (modName === $(this).data('href')) {
            $(this).addClass("on");
        }
    })

    loadHtml(modName);
}

function bindMenu() {


    $("#header nav a").on('click', function(e) {
        e.stopPropagation();

        if ($(this).hasClass("on")) {
            return false;
        }

        $("#header nav a").removeClass("on");
        $(this).addClass("on");

        var modName = $(this).data('href');

        loadHtml(modName);
    });

}

function loadHtml(modName) {

    pageDatas.params = null;


    var htmlPath = './components/' + modName + '/' + modName + '.html';

    $.get(htmlPath, [], function(html) {
        $("#" + modName).html(html);
        loadJs(modName);
    });
}


function loadJs(name) {

    var currentMod;
    var oNavH = $("#header nav").innerHeight() - 2;

    if (pageDatas.isDelay) {
        setTimeout(function() {
            $("body,html").animate({
                scrollTop: pageY(document.getElementById(name)) - oNavH + "px"
            }, 300);
            pageDatas.isDelay = false;
        }, 1000)
    } else {
        $("body,html").animate({
            scrollTop: pageY(document.getElementById(name)) - oNavH + "px"
        }, 600);
    }


    if (name === 'about') {
        require.ensure([], function(require) {
            currentMod = require('./components/about/about');
            currentMod.init();
        }, 'about');
    } else if (name === 'contact') {
        require.ensure([], function(require) {
            currentMod = require('./components/contact/contact');
            currentMod.init(pageDatas.params);
        }, 'contact');
    } else if (name === 'service') {
        require.ensure([], function(require) {
            currentMod = require('./components/service/service');
            currentMod.init(pageDatas.params);
        }, 'service');
    } else if (name === 'dynamic') {
        require.ensure([], function(require) {
            currentMod = require('./components/dynamic/dynamic');
            currentMod.init(pageDatas.params);
        }, 'dynamic');
    } else if (name === 'history') {
        require.ensure([], function(require) {
            currentMod = require('./components/history/history');
            currentMod.init(pageDatas.params);
        }, 'history');
    } else if (name === 'case') {
        require.ensure([], function(require) {
            currentMod = require('./components/case/case');
            currentMod.init(pageDatas.params);
        }, 'case');
    } else {
        if (__DEV__) {
            console.log('no request mod');
        }
    }
}


function initialize() {
    initMenu();

    bindMenu();
}

function pageY(elem) { //本来用的是jq的offset方法，但不兼容ie低版本，所以用了原生的js
    return elem.offsetParent ? elem.offsetTop + pageY(elem.offsetParent) : elem.offsetTop;
}

$(function() {
    initialize();
});
