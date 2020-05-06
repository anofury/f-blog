---
title: CSS初级
description: CSS初级笔记
date: 2019-10-14 15:50:23
categories: Web-Frontend
tags: 代码, 笔记, CSS
---

## 小众CSS

``` css
移动端H5 // 禁止长按呼出菜单 禁用长按页面时的弹出菜单(iOS下有效)，最好使用在img和a标签上

img {
    -webkit-touch-callout: none;
    pointer-events: none; // 像微信浏览器还是无法禁止，加上这行样式即可
    -webkit-user-drag: none;
    c // 禁止拖动
}

// 禁止长按选择文字
div {
    user-select: none;
}

// IOS 滑动不顺畅
div {
    -webkit-overflow-scrolling: touch;
}

// 屏幕旋转为横屏时，字体大小会变

* {

    -webkit-text-size-adjust: 100%;
}

// 取消IOS下可点击元素的半透明背景
div {
    -webkit-tap-highlight-color: transparent
}

// 限定几行
div {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
}

// 最简单的rem自适应
html {
    font-size: calc(100vw / 3.75);
}

body {
    font-size: .14rem;
}

// 解决active伪类失效
<body ontouchstart></body>
```

<!-- more -->

## animation-play-state ios不生效

此css属性在IOS下不会生效且对其他动画会有影响
解决方案： `ele.style.transform = getComputedStyle(ele).transform` 

## touch-action

## filter

drop-shadow(0 0 2px #999); 和 box-shadow 区别：drop-shadow 是真正意义上的投影（对于透明层的阴影有穿透的功能），而box-shadow只是盒阴影

## white-space

作用于空格和回车，用于控制空格是否合并、回车是否可折行、句子太长是否在空格处折行常用取值不同的作用

* normal：多个连续的空格会被合并为一个，回车会被忽略，同时句子如果太长，会在空白处折行
* pre：用等宽字体显示预先格式化样式的文本。不合并字间的空白距离和进行两端对齐。
* nowrap：与normal不同的一点是如果句子长了也不会折行
* 如果用了white-space为nowrap，设置其他的强制折行（word-break）是不起作用的，要将white-space设置为normal

## word-wrap

作用于单词上，控制超长单词是否折行，常用取值的作用 

* normal：单词超长也不可折行，产生溢出
* break-word：单词超长会折行

## word-break

* normal：如果是中文则到边界处的汉字换行, 如果是英文整个词换行, 注意: 如果出现某个英文字符串长度超过边界, 则后面的部分将撑开边框, 如果边框为固定属性, 则后面部分将无法显示. 
* break-all：强行换行, 将截断英文单词
* keep-all：不允许字断开。如果是中文将把前后标点符号内的一个汉字短语整个换行, 英文单词也整个换行, 注意: 如果出现某个英文. 字符串长度超过边界, 则后面的部分将撑开边框, 如果边框为固定属性, 则后面部分将无法显示。

## border-collapse

* separate：默认值。边框会被分开。不会忽略 border-spacing 和 empty-cells 属性。
* collapse：如果可能，边框会合并为一个单一的边框。会忽略 border-spacing 和 empty-cells 属性。
* inherit： 规定应该从父元素继承 border-collapse 属性的值。
* line-height：如果使用%作为值，此时是相对字体大小来计算的

## srcset

``` html
<img src="photo_w350.jpg" srcset="photo_w350.jpg 1x, photo_w640.jpg 2x">
如果设备dpr是1则加载photo_w350.jpg，如果dpr是2则加载photo_w640.jpg，如果浏览器不支持srcset，则加载src属性节点中的图片。
```

## picture

``` html
<picture>
    <source srcset="banner_w1000.jpg" media="(min-width: 801px)">
    <source srcset="banner_w800.jpg" media="(max-width: 800px)">
    <img src="banner_w800.jpg">
</picture>
如果页面宽度（逻辑宽度）大于800px，则加载大图。

<picture>
    <source srcset="banner.webp" type="image/webp">
    <img src="banner.jpg">
</picture>
如果浏览器支持webp格式图片，则加载webp格式图片。
```

## a 标签

``` html
<a target="_blank" href="javascript:void(0);">点我啊</a>
```

**现象**：在谷歌中点击a标签，正常；但是在IE和火狐则会跳转到一个空白页面。

**问题原因**：浏览器默认处理事件的顺序有差异： 

* Chrome顺序：onclick -> href -> target 
* IE和Firefox顺序：onclick -> target -> href

**解决方案**：

1. 添加 `onClick` 事件， `return false` 阻止之后浏览器默认事件的执行。

   

``` html
   <a target="_blank" onclick="return false" href="javascript:void(0);">点我啊</a>
   // 注意：return false 会阻止浏览器默认事件的执行
```

2. 去掉 `href` 属性

``` html
   <a target="_blank">点我啊</a>
```

## URL Scheme

打开外部应用

## `grid ` 布局
