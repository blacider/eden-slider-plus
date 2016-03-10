# Eden Slider Plus

> 中山大学SDCS学院，软件工程专业，Eden教学系统，功能优化解决方案。

> 作者：吴家荣

# 更新通知

最新版：2016/03/10，v0.4.0

## 0 简介

由于[Eden](http://eden.sysu.edu.cn/)上的Slider无法全屏显示，而且不能使用快捷键进行控制。再者，[Eden](http://eden.sysu.edu.cn/)本身有诸多在呈现上的不恰当之处。

因此，我设计并开发了这个简单的插件，以优化显示和提供辅助功能。

**Eden Slider Plus**

插件的作用是优化Eden的呈现方式，并且改善Eden Slider的使用体验。功能如截图所示。

![](http://ww3.sinaimg.cn/large/ed796d65jw1f1q2sf4kowj209709ugme.jpg)

## 1 下载并安装

### 1.1 chrome浏览器：直接安装插件

1. 下载打包好的拓展程序：[eden-slider-plus.crx](https://github.com/wujr5/eden-slider-plus/raw/master/eden-slider-plus.crx)
2. 使用chrome浏览器打开：chrome://extensions
3. 把下载好的压缩包拖拽到空白位置

安装效果：

![](http://ww4.sinaimg.cn/large/ed796d65jw1f1q2w0w4c3j217y08ejsi.jpg)

### 1.2 chrome浏览器：间接引入插件

> 如果chrome浏览器升级到最高版本的时候，对安全性的要求变高了。直接导致的后果就是，安装后的外源插件无法启用。

> 如图所示：
> ![](http://ww3.sinaimg.cn/large/ed796d65jw1f1q2tbvkbzj20wc06v75r.jpg)

> 在这种背景下，提出间接引入插件的折衷方案

1. 下载源码压缩包：[eden-slider-plus.zip](https://github.com/wujr5/eden-slider-plus/raw/master/eden-slider-plus.zip)
2. 解压到您电脑上的任意位置
3. 使用chrome浏览器打开：chrome://extensions
4. 勾选开发者模式，点击加载已解压了的拓展程序
	![](http://ww3.sinaimg.cn/large/ed796d65jw1f1q39c1gbwj20vy04vjs9.jpg)
5. 把解压好的文件夹作为根目录，点击确定，即可安装成功
	![](http://ww4.sinaimg.cn/large/ed796d65jw1f1q2r3vqrhj20g90nkgo7.jpg)
	![](http://ww3.sinaimg.cn/large/ed796d65jw1f1q2rq1a72j20vy07omyq.jpg)

### 1.3 其他浏览器

一般情况下，凡是chrome内核或者包含chrome内核的浏览器都能仿照以上两种方式安装插件。

如：360安全浏览器，qq浏览器等。

但是建议直接使用chrome浏览器。因为chrome浏览器是最简洁，最好用，最适合开发者的浏览器。

## 2 Eden呈现与功能优化

### 2.1 呈现优化

1. 横向滑动条突出显示。已优化。

### 2.2 功能优化

1. 双击全屏或退出
2. Enter键全屏或退出
3. 左方向键减少页数
4. 右方向键增加页数

## 3 Bug Report

> 欢迎大家在issues上提各种意见。也欢迎大家参与插件的开发。

Bug Report: [issues](https://github.com/wujr5/eden-slider-plus/issues)

## 4 更新记录

> 版本命名规范参考：[语义化版本 2.0.0](http://semver.org/lang/zh-CN/)

### 4.1 记录

1. 2016/03/09，v0.2.1 版本发布
2. 2016/03/09，v0.2.2 bug fix
3. 2016/03/09，v0.2.3 bug fix
4. 2016/03/09，v0.2.4 添加fullscreenchange事件，修复按esc键退出后，slider宽高度不变的bug
5. 2016/03/09，v0.2.5 bug fix
6. 2016/03/09，v0.3.0 添加Google Analytics
7. 2016/03/10，v0.4.0 添加chrome desktop notification

### 4.2 注意事项

进行版本更新的时候，为了能够使得已经安装的插件，在使用1.1的方式进行安装的时候，能够进行自动更新，需要按照规则进行一定的设置和操作。

1. 按照规范改变`updates.xml`中的版本号。
2. 同样地改变`manifest.json`中的`version`字段。
3. 在chrome://extensions中对更新的插件程序打包。
4. 在资源管理器中，对文件夹`eden-slider-plus`压缩成.zip格式文件，放在根目录。
5. 进行git操作，把更push到github

## 5 安全性声明

该插件只对[Eden](http://eden.sysu.edu.cn/)起作用。并且不会读取[Eden](http://eden.sysu.edu.cn/)以及浏览器其他标签页的敏感信息。使用者可以直接查看源码，或者查看拓展程序中的权限声明。

![](http://ww1.sinaimg.cn/large/ed796d65jw1f1q36zz2yvj20tm0m7n1p.jpg)

## 6 License

This project is under MIT License (MIT)
