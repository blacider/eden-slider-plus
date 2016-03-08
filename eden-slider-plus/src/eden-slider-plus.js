/**
 * author: 吴家荣
 * email: jiarongwu.se@foxmail.com
 * update: 2016/03/08 
 * ------------------------------------------------------------------
 * JS类：EdenSliderPlus
 * 功能：实现全屏、退出全屏、上下翻页、跳到指定页、优化展现等功能
 * ------------------------------------------------------------------
 */

// EdenSliderPlus类
var EdenSliderPlus = function () {}

EdenSliderPlus.prototype.init = function() {
  var slider = $('#slider'); // 取得幻灯片元素

  if (slider == null) throw Error("No elements' id name is slider");
  
  var width = slider.innerWidth(); // 幻灯片元素宽
  var height = slider.innerHeight(); // 幻灯片元素高
  var screenWidth = window.screen.width; // 电脑屏幕宽
  var screenHeight = window.screen.height; // 电脑屏幕高

  if (height < 100) height = width * (657 / 819.188);

  EdenSliderPlus.width = width;
  EdenSliderPlus.fullScreenWidth = 
    screenHeight * (width / height); // 适应高度而计算出来的全屏后的宽度
  EdenSliderPlus.slider = slider;
  EdenSliderPlus.isFullScreen = false;

  console.log(width, height, screenWidth, screenWidth, EdenSliderPlus.fullScreenWidth);
}

// 设置全屏的函数
EdenSliderPlus.prototype.launchFullscreen = function (element) {
  if(element.requestFullscreen) {
    element.requestFullscreen();
  } else if(element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if(element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if(element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}

// 退出全屏的函数
EdenSliderPlus.prototype.exitFullscreen = function () {
  if(document.exitFullscreen) {
    document.exitFullscreen();
  } else if(document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if(document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

// 启动嵌入的js代码
EdenSliderPlus.prototype.activate = function() {
  var prev = $('.callbacks_nav.callbacks1_nav.prev')[0];
  var next = $('.callbacks_nav.callbacks1_nav.next')[0];

  EdenSliderPlus.slider[0].ondblclick = function() { // 双击鼠标进入和退出全屏
    if (EdenSliderPlus.isFullScreen == false) {
      EdenSliderPlus.isFullScreen = true;
      EdenSliderPlus.prototype.launchFullscreen(EdenSliderPlus.slider[0]);
      EdenSliderPlus.slider.width(EdenSliderPlus.fullScreenWidth);
    } else {
      EdenSliderPlus.isFullScreen = false;
      EdenSliderPlus.slider.width(EdenSliderPlus.width);
      EdenSliderPlus.prototype.exitFullscreen();
    }
	}

	document.body.onkeydown = function () {
		if (event.keyCode == 13) { // Enter键进入和退出全屏
			if (EdenSliderPlus.isFullScreen == false) {
        EdenSliderPlus.isFullScreen = true;
        EdenSliderPlus.prototype.launchFullscreen(EdenSliderPlus.slider[0]);
        EdenSliderPlus.slider.width(EdenSliderPlus.fullScreenWidth);
      } else {
        EdenSliderPlus.isFullScreen = false;
        EdenSliderPlus.slider.width(EdenSliderPlus.width);
        EdenSliderPlus.prototype.exitFullscreen();
      }
		}
		else if (event.keyCode == 27) { // 按esc键退出全屏，Mac OS的chrome(48.0.2564.97 64-bit))中失效
      EdenSliderPlus.isFullScreen = false;
			EdenSliderPlus.slider.width(EdenSliderPlus.width);
      EdenSliderPlus.prototype.exitFullscreen();
		}
		else if (event.keyCode == 37) {
			prev.click();
		}
		else if (event.keyCode == 39) {
			next.click();
		}
	}
}

ESP = new EdenSliderPlus();

setTimeout(function() {
  ESP.init();
  ESP.activate();
}, 2000);
