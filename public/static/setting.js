var commonSetting = {
    appTitle: "管理后台风格的模板项目",
    baseUrl: "taskmini" // 云函数名称
};

/**
 * 初始化屏幕分辨率
 */

var screen = {
    designWidth: 1920, // 设计稿屏幕宽度
    designHeight: 1080, // 设计稿屏幕高度
    minHeight: 620, // laptop高度
    resize: function () {
        document.documentElement.style.fontSize = document.documentElement.clientWidth / 19.2 + "px";
    }
};

screen.resize();
addEventListener("resize", screen.resize);

// 是否是windows系统
function _isWindows() {
    var agent = navigator.userAgent.toLowerCase();
    if (agent.indexOf("windows") >= 0) {
        return true;
    }
    return false;
}

function _addHandler(element, type, handler) {
    if (element.addEventListener) {
        element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
        element.attachEvent("on" + type, handler);
    } else {
        element["on" + type] = handler;
    }
}

// 校正浏览器缩放比例
function _correct() {
    document.getElementsByTagName("body")[0].style.zoom = 1 / window.devicePixelRatio;
}

// 浏览器即使放大了，页面也不会放大
// 以通过页面  <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">解决
// _addHandler(window, "resize", function () {
//     _isWindows() && _correct();
// });
