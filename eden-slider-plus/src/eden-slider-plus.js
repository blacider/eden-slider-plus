/**
 * author: 吴家荣
 * email: jiarongwu.se@foxmail.com
 * update: 2016/03/15
 * ------------------------------------------------------------------
 * JS类：EdenSliderPlus
 * 功能：实现全屏、退出全屏、上下翻页、下载PDF、优化展现等功能
 * ------------------------------------------------------------------
 */

// EdenSliderPlus类
var EdenSliderPlus = function () {}

EdenSliderPlus.prototype.init = function() {
  var slider = $('#slider'); // 取得幻灯片元素

  var width = slider.innerWidth(); // 幻灯片元素宽
  var height = slider.innerHeight();  // 幻灯片元素高
  var screenWidth = window.screen.width; // 电脑屏幕宽
  var screenHeight = window.screen.height; // 电脑屏幕高

  if (height < 100) height = width * (657 / 819.188);

  EdenSliderPlus.width = width;
  EdenSliderPlus.fullScreenWidth = 
    screenHeight * (width / height); // 适应高度而计算出来的全屏后的宽度
  EdenSliderPlus.slider = slider;
  EdenSliderPlus.isFullScreen = false;
}

// 设置全屏的函数
EdenSliderPlus.prototype.launchFullscreen = function (element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}

// 退出全屏的函数
EdenSliderPlus.prototype.exitFullscreen = function () {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

// 启动嵌入的js代码
EdenSliderPlus.prototype.activate = function() {
  fixDjangoAceBug();

  if (EdenSliderPlus.slider.length == 0) throw Error("No elements' id name is slider");

  setDownloadButton();
  setDblClickEvent();
  setKeydownEvent();
  setFullscreenChangeEvent();
}

// 修复代码编辑区全屏后无法缩小的bug
function fixDjangoAceBug() {
  $('.django-ace-toolbar .django-ace-max_min').click(function() {
    $('.django-ace-toolbar').toggleClass('django-ace-toolbar-plus');
    $('.django-ace-widget').toggleClass('django-ace-witget-plus');
  })
}

// 添加下载按钮
function setDownloadButton() {
  var li = document.createElement('li');
  var btn = document.createElement('button');
  var mask = document.createElement('div');
  var prompt = document.createElement('div');

  btn.className = 'download-btn';
  btn.textContent = 'DOWNLOAD PDF';
  li.appendChild(btn);
  li.className = 'download-btn-li'
  mask.className = 'esp-mask';
  prompt.className = 'esp-prompt sr-only';

  prompt.appendChild(createProgerss());
  mask.appendChild(prompt);
  $('#header').prepend(mask);
  $('#nav ul').prepend(li);

  // 一页pdf构建完毕事件
  EdenSliderPlus.addedPages = 0;
  EdenSliderPlus.slider[0].addEventListener('add-page-load', function() {
    console.log('page: ' + EdenSliderPlus.addedPages);
    var images = $('#slider li img');
    if (EdenSliderPlus.addedPages == images.length) {
      EdenSliderPlus.doc.save(document.title + '.pdf');
      $('.esp-mask').removeClass('esp-mask-open');
      $('.esp-prompt').addClass('sr-only');
    } else {
      setProgress(parseInt((++EdenSliderPlus.addedPages) / images.length * 100) + '%');
      setTimeout((function(index) {
        return function() {
          addPage(index);
        }
      })(EdenSliderPlus.addedPages - 1), 0);
    }
  })
  EdenSliderPlus.onePageLoadEvent = document.createEvent("HTMLEvents");
  EdenSliderPlus.onePageLoadEvent.initEvent("add-page-load", false, false);

  btn.onclick = downloadPdf;
}

// 创建进度条
function createProgerss() {
  var progress = document.createElement('div');
  progress.className = 'progress';

  var progressBar = document.createElement('div');
  progressBar.className = 'progress-bar progress-bar-striped active';
  progressBar.setAttribute('role', 'progressbar');
  progressBar.setAttribute('aria-valuemin', '0');
  progressBar.setAttribute('aria-valuemax', '100');
  progress.appendChild(progressBar);

  return progress;
}

// 下载按钮点击事件
function downloadPdf() {
  var images = $('#slider li img');

  if (EdenSliderPlus.addedPages == images.length) {
    EdenSliderPlus.doc.save(document.title + '.pdf');
    return;
  }

  $('.esp-mask').addClass('esp-mask-open'); // 开启mask
  $('.esp-prompt').removeClass('sr-only');
  EdenSliderPlus.doc = new jsPDF('l', 'mm', 'a4');
  setPDFAttributes();
  
  setProgress(parseInt((++EdenSliderPlus.addedPages) / images.length * 100) + '%');
  setTimeout((function(index) {
    return function() {
      addPage(index);
    }
  })(EdenSliderPlus.addedPages - 1), 0);
}

// 增加一页
function addPage(i) {
  var images = $('#slider li img');
  var canvas = document.createElement('CANVAS');
  var ctx = canvas.getContext('2d');

  var imgData;

  canvas.height = images[i].naturalHeight;
  canvas.width = images[i].naturalWidth;

  ctx.drawImage(images[i], 0, 0);
  imgData = canvas.toDataURL('image/jpeg');

  EdenSliderPlus.doc.addPage();
  var height = 210;
  var width = height * (images[i].naturalWidth / images[i].naturalHeight);
  var paddingLeft = parseInt((297 - width) / 2);
  EdenSliderPlus.doc.addImage(imgData, 'jpg', paddingLeft, 0, width, 210);

  EdenSliderPlus.slider[0].dispatchEvent(EdenSliderPlus.onePageLoadEvent);
}

// 设置进度
function setProgress(percent) {
  $('.progress .progress-bar').width(percent);
  $('.progress .progress-bar').text(percent);
}

// 设置pdf相关属性
function setPDFAttributes() {
  EdenSliderPlus.doc.setProperties({
    title: document.title,
    subject: 'PDF from Eden Slider Plus',
    author: '吴家荣',
    keywords: 'Eden, SYSU, SDCS',
    creator: 'jsPDF'
  });

  EdenSliderPlus.doc.setFont("helvetica");
  EdenSliderPlus.doc.setFontType("bold");

  EdenSliderPlus.doc.setFontSize(50);
  EdenSliderPlus.doc.text(20, 40, 'Eden Slider Plus');
  EdenSliderPlus.doc.setFontSize(25);
  EdenSliderPlus.doc.setFontType('italic');
  EdenSliderPlus.doc.text(20, 60, 'https://github.com/wujr5/eden-slider-plus');

  EdenSliderPlus.doc.setFontType("bold");
  EdenSliderPlus.doc.text(20, 110, 'Generated by: jsPDF')
  EdenSliderPlus.doc.setFontType('italic');
  EdenSliderPlus.doc.text(20, 120, 'https://parall.ax/products/jspdf');
  EdenSliderPlus.doc.setFontType("bold");
  EdenSliderPlus.doc.text(20, 140, 'Any problem?');
  EdenSliderPlus.doc.setFontType('italic');
  EdenSliderPlus.doc.text(20, 150, 'Be free to contact: jiarongwu.se@foxmail.com');
}

// 设置双击事件
function setDblClickEvent() {
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
}

// 设置键盘事件
function setKeydownEvent() {
  var prev = $('.callbacks_nav.callbacks1_nav.prev')[0];
  var next = $('.callbacks_nav.callbacks1_nav.next')[0];

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
    else if (event.keyCode == 37) { // 左箭头，触发上一页按钮
      prev.click();
    }
    else if (event.keyCode == 39) { // 右箭头，触发下一页按钮
      next.click();
    }
  }
}

// 设置全屏与否响应事件
function setFullscreenChangeEvent() {
  document.addEventListener("fullscreenchange", function () {
    if (document.isFullScreen == false) {
      EdenSliderPlus.slider.width(EdenSliderPlus.width);
    }
  }, false);

  document.addEventListener("mozfullscreenchange", function () {
    if (document.mozIsFullScreen == false) {
      EdenSliderPlus.slider.width(EdenSliderPlus.width);
    }
  }, false);

  document.addEventListener("webkitfullscreenchange", function () {
    if (document.webkitIsFullScreen == false) {
      EdenSliderPlus.slider.width(EdenSliderPlus.width);
    }
  }, false);

  document.addEventListener("msfullscreenchange", function () {
    if (document.msIsFullScreen == false) {
      EdenSliderPlus.slider.width(EdenSliderPlus.width);
    }
  }, false);
}

ESP = new EdenSliderPlus();

setTimeout(function() {
  ESP.init();
  ESP.activate();
}, 100);
