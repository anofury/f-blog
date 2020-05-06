---
title: ECMAScript
description: ECMAScript
date: 2019-11-28 09:35:04
categories: Web-Frontend
tags: 代码, 笔记, JavaScript
---

阶段 0 是纯属有人提出的想法，将其整理为阶段 1 的提案，进行审查和讨论，直到阶段 3 为止，最终将其划分为阶段 4 的优先级。到达阶段 4 后，将会在浏览器中实现并计划发布。

## ES6

类、类的继承、生成器、函数参数默认值、延展操作符、字符串模板、箭头函数、Promise/Promise. all/Promise. race、const/let、数组解构、Map/Set、for... of、Proxy(代理)/Reflect(反射)、Intl. NumberFormat/Intl. DateTimeFormat、find(同ES5中filter)/findIndex、string. includes、startsWith/endWith、string. repeat、Object. assign(第一层为深拷贝，其它层为浅拷贝)... 

## ES7

幂运算符、array. includes... 

<!-- more -->

## ES8

Object. entries/Object. values、padStart/padEnd、Async/Await、SharedArrayBuffer对象、Atomics对象

有了 SharedArrayBuffer 后，多个 web worker 就可以同时读写同一块内存了你再也不需要 postMessage 伴有时延的通信了，多个 web worker 对数据访问都没有时延了，SharedArrayBuffer 对象用来表示一个通用的，固定长度的原始二进制数据缓冲区，类似于 ArrayBuffer 对象，它们都可以用来在共享内存（shared memory）上创建视图。与 ArrayBuffer 不同的是，SharedArrayBuffer 不能被分离。

``` javascript
/**
 * 
 * @param {*} length 所创建的数组缓冲区的大小，以字节(byte)为单位。  
 * @returns {SharedArrayBuffer} 一个大小指定的新 SharedArrayBuffer 对象。其内容被初始化为 0。
 */
new SharedArrayBuffer(length)
```

Atomics 对象提供了一组静态方法用来对 SharedArrayBuffer 对象进行原子操作。

这些原子操作属于 Atomics 模块。与一般的全局对象不同，Atomics 不是构造函数，因此不能使用 new 操作符调用，也不能将其当作函数直接调用。Atomics 的所有属性和方法都是静态的（与 Math 对象一样）。

多个共享内存的线程能够同时读写同一位置上的数据。原子操作会确保正在读或写的数据的值是符合预期的，即下一个原子操作一定会在上一个原子操作结束后才会开始，其操作过程不会中断。

``` javascript
Atomics.add()
//将指定位置上的数组元素与给定的值相加，并返回相加前该元素的值。

Atomics.and()
//将指定位置上的数组元素与给定的值相与，并返回与操作前该元素的值。

Atomics.compareExchange()
//如果数组中指定的元素与给定的值相等，则将其更新为新的值，并返回该元素原先的值。

Atomics.exchange()
//将数组中指定的元素更新为给定的值，并返回该元素更新前的值。

Atomics.load()
//返回数组中指定元素的值。

Atomics.or()
//将指定位置上的数组元素与给定的值相或，并返回或操作前该元素的值。

Atomics.store()
//将数组中指定的元素设置为给定的值，并返回该值。

Atomics.sub()
//将指定位置上的数组元素与给定的值相减，并返回相减前该元素的值。

Atomics.xor()
//将指定位置上的数组元素与给定的值相异或，并返回异或操作前该元素的值。

//wait() 和 wake() 方法采用的是 Linux 上的 futexes 模型（fast user-space mutex，
//快速用户空间互斥量），可以让进程一直等待直到某个特定的条件为真，主要用于实现阻塞。

Atomics.wait()
//检测数组中某个指定位置上的值是否仍然是给定值，是则保持挂起直到被唤醒或超时。
//返回值为 "ok"、"not-equal" 或 "time-out"。调用时，如果当前线程不允许阻塞，则会抛出异常
//（大多数浏览器都不允许在主线程中调用 wait()）。

Atomics.wake()
//唤醒等待队列中正在数组指定位置的元素上等待的线程。返回值为成功唤醒的线程数量。

Atomics.isLockFree(size)
//可以用来检测当前系统是否支持硬件级的原子操作。对于指定大小的数组，如果当前系统支持硬件级的原子操作，
//则返回 true；否则就意味着对于该数组，Atomics 对象中的各原子操作都只能用锁来实现。此函数面向的是技术专家。
```

## ES9

对象解构(可以说是ES6的扩展)、Promise. finally、解除模板字面量限制、异步迭代器/for-wait-of、正则表达式命名捕获组

``` javascript
async function process(array) {
    for await (let i of array) {
        doSomething(i);
    }
}

const
    reDate = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/,
    match = reDate.exec('2018-04-30'),
    year = match.groups.year, // 2018
    month = match.groups.month, // 04
    day = match.groups.day; // 30

const
    reDate = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/,
    d = '2018-04-30',
    usDate = d.replace(reDate, '$<month>-$<day>-$<year>');
```

## ES10

Array. flat、Array. flatMap(等同于 map(). flat())、Object. fromEntries(Object. entries 的反向操作)、String. trimStart/trimEnd、如果 key 相同，则 Array. sort 保留其顺序、BigInt（64位数字）、改进了对 JSON. stringify() 的 Unicode 支持、将 JavaScript 设为 JSON 的超集、globalThis …

`globalThis` 是一个全新的标准方法用来获取全局 `this` 。之前开发者会通过如下的一些方法获取：

* 全局变量 `window` ：是一个经典的获取全局对象的方法。但是它在 Node. js 和 Web Workers 中并不能使用
* 全局变量 `self` ：通常只在 Web Workers 和浏览器中生效。但是它不支持 Node. js。一些人会通过判断 `self` 是否存在识别代码是否运行在 Web Workers 和浏览器中
* 全局变量 `global` ：只在 Node. js 中生效

新提案也规定了， `Object.prototype` 必须在全局对象的原型链中。下面的代码在现在的最新浏览器中已经会返回 `true` 了：

``` javascript
Object.prototype.isPrototypeOf(globalThis); // true
```

Decorator、可选链?. 
