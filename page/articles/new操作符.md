---
title: new操作符
description: new操作符的实现原理
date: 2020-05-19 11:55:35
categories: Web-Frontend
tags: 代码, 笔记, JavaScript
---

## Javascript引擎中的对象模型

![new](articles\assets\new.png)

new 操作符大致做了以下三点：

``` javascript
let obj = {}
obj.proto = Base.prototype
Base.call(obj)
```

<!-- more -->

当 new 一个构造函数，得到的实例继承了构造器的构造属性以及原型上的属性：

``` javascript
// ES5构造函数
let Parent = function(name, age) {
    //1.创建一个新对象，赋予this，这一步是隐性的，
    // let this = {};
    //2.给this指向的对象赋予构造属性
    this.name = name;
    this.age = age;
    //3.如果没有手动返回对象，则默认返回this指向的这个对象，也是隐性的
    // return this;
};
const child = new Parent();
```

实现一个 new

``` javascript
// 构造器函数
let Parent = function(name, age) {
    this.name = name;
    this.age = age;
};
Parent.prototype.sayName = function() {
    console.log(this.name);
};
//自己定义的new方法
let newMethod = function(Parent, ...rest) {
    // 1.以构造器的prototype属性为原型，创建新对象；
    let child = Object.create(Parent.prototype);
    // 2.将this和调用参数传给构造器执行
    Parent.apply(child, rest);
    // 3.返回第一步的对象
    return child;
};
//创建实例，将构造函数Parent与形参作为参数传入
const child = newMethod(Parent, 'echo', 26);
child.sayName() //'echo';

//最后检验，与使用new的效果相同
child instanceof Parent //true
child.hasOwnProperty('name') //true
child.hasOwnProperty('age') //true
child.hasOwnProperty('sayName') //false
```
