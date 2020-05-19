---
title: Macrotasks和Microtasks
description: Macrotasks和Microtasks
date: 2020-05-19 11:58:47
categories: Web-Frontend
tags: 代码, 笔记, JavaScript
---

Macrotasks和Microtasks 都属于JavaScript的异步任务中的一种，他们分别有如下API：
**macrotasks:** setTimeout, setInterval, setImmediate, I/O, UI rendering
**microtasks:** process.nextTick, Promise, MutationObserver

<!-- more -->

``` javascript
console.log(1);
setTimeout(function() {
    console.log(2);
}, 0);
Promise.resolve().then(function() {
    console.log(3);
}).then(function() {
    console.log(4);
});

// 1 3 4 2
```

可以看到，Promise 的函数代码的异步任务会优先于 setTimeout 的延时为0的任务先执行。

原因是任务队列分为 macrotasks 和 microtasks, 而 promise 中的 then 方法的函数会被推入到 microtasks 队列中，而 setTimeout 函数会被推入到macrotasks 任务队列中，在每一次事件循环中，macrotask 只会提取一个执行，而 microtask 会一直提取，直到 microsoft 队列为空为止。

也就是说如果某个 microtask 任务被推入到执行中，那么当主线程任务执行完成后，会循环调用该队列任务中的下一个任务来执行，直到该任务队列到最后一个任务为止。而事件循环每次只会入栈一个 macrotask，主线程执行完成该任务后又会检查 microtasks 队列并完成里面的所有任务后再执行 macrotask 的任务。

为啥要用 microtask? 

根据 HTML Standrad， 在每个 task 运行完以后，UI 都会重新渲染，那么在 microtask 中就完成数据更新，因此当前 task 结束就可以得到最新的 UI 了。反之，如果新建一个 task 来做数据更新的话，那么渲染会执行两次。
