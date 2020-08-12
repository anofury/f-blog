---
title: Macrotasks和Microtasks
description: Macrotasks和Microtasks
date: 2020-08-12 15:23:47
categories: Web-Frontend
tags: 代码, 笔记, JavaScript
---

在一个浏览器环境中，只能有一个事件循环，但是可以有多个任务队列，而每个任务都有一个任务源，**相同任务源的任务，只能放到一个任务队列中**，而 `microtask` 和 `macrotask` 就是两种不同的任务队列：

- macrotasks： setTimeout, setInterval, setImmediate, I/O, UI rendering
- microtasks：process.nextTick, Promise, MutationObserver

<!-- more -->

```javascript
console.log(1);
setTimeout(function(){
    console.log(2);
}, 0);
Promise.resolve().then(function(){
    console.log(3);
}).then(function(){
    console.log(4);
});

// 1 3 4 2
```

promise 中的 then 方法的函数会被推入到 microtasks 队列中，而 setTimeout 函数会被推入到macrotasks 任务队列中，在每一次事件循环中，macrotask 只会提取一个执行，而 microtask 会一直提取，直到 microsoft 队列为空为止。

也就是说如果某个 microtask 任务被推入到执行中，那么当主线程任务执行完成后，会循环调用该队列任务中的下一个任务来执行，直到该任务队列到最后一个任务为止。而事件循环每次只会入栈一个 macrotask，主线程执行完成该任务后又会检查 microtasks 队列并完成里面的所有任务后再执行 macrotask 的任务。

如果以处理条目的速度向 microtask 这个队列添加条目，那么主线程永远在处理微任务的回调函数。只有当微任务回调函数队列为空时，事件循环才会重新渲染页面，防止过多的操作重复渲染造成性能问题；如果主线程一直在处理微任务，则会阻塞页面的响应。

JavaScript 并发模型基于“事件循环”。 “浏览器是 JS 的家”时是指浏览器提供运行时环境来执行 JS 代码。

浏览器的主要组件包括**调用堆栈**，**事件循环**，**任务队列**和**Web API**。 像`setTimeout`，`setInterval`和`Promise`这样的全局函数不是 JavaScript 的一部分，而是 Web API 的一部分。 JavaScript 环境的可视化形式如下所示：

![eventloop](articles\assets\eventloop.png)

JavaScript 主线程拥有一个 **执行栈** 以及一个 **任务队列**，主线程会依次执行代码，当遇到函数时，会先将函数 入栈，函数运行完毕后再将该函数 出栈，直到所有代码执行完毕。

那么遇到 WebAPI（例如：`setTimeout`, `AJAX`）这些函数时，这些函数会立即返回一个值，从而让主线程不会在此处阻塞。而真正的异步操作会由浏览器执行，浏览器会在这些任务完成后，将事先定义的回调函数推入主线程的 **任务队列** 中。

**事件循环(Event loop)** 不断地监视任务队列(Task Queue)，并按它们排队的顺序一次处理一个回调。每当**调用堆栈(call stack)**为空时，**Event loop**获取回调并将其放入**堆栈(stack )**(箭头3)中进行处理。如果调用堆栈不是空的，**则事件循环不会将任何回调推入堆栈**。