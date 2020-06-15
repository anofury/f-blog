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

大多数时候，开发人员假设在**事件循环<event loop>**图中只有一个任务队列。但事实并非如此，我们可以有多个任务队列。由浏览器选择其中的一个队列并在该队列中**处理回调<callbacks>**。

在底层来看，JavaScript中有宏任务和微任务。 `setTimeout` 回调是**宏任务**，而 `Promise` 回调是**微任务**。

主要的区别在于他们的执行方式。宏任务在单个循环周期中一次一个地推入堆栈，但是微任务队列总是在执行后返回到事件循环之前清空。因此，如果你以处理条目的速度向这个队列添加条目，那么你就永远在处理微任务。只有当微任务队列为空时，事件循环才会重新渲染页面。

为啥要用 microtask? 

根据 HTML Standrad， 在每个 task 运行完以后，UI 都会重新渲染，那么在 microtask 中就完成数据更新，因此当前 task 结束就可以得到最新的 UI 了。反之，如果新建一个 task 来做数据更新的话，那么渲染会执行两次。

JavaScript并发模型基于“事件循环”。 当我们说“浏览器是 JS 的家”时我真正的意思是浏览器提供运行时环境来执行我们的JS代码。

浏览器的主要组件包括**调用堆栈**，**事件循环****，任务队列**和**Web API**。 像 `setTimeout` ， `setInterval` 和 `Promise` 这样的全局函数不是JavaScript的一部分，而是 Web API 的一部分。 JavaScript 环境的可视化形式如下所示：

![eventloop](articles\assets\eventloop.png)

JS调用栈是后进先出(LIFO)的。引擎每次从堆栈中取出一个函数，然后从上到下依次运行代码。每当它遇到一些异步代码，如 `setTimeout` ，它就把它交给 `Web API` (箭头1)。因此，每当事件被触发时， `callback` 都会被发送到任务队列（箭头2）。

**事件循环(Event loop)**不断地监视任务队列(Task Queue)，并按它们排队的顺序一次处理一个回调。每当**调用堆栈(call stack)**为空时，**Event loop**获取回调并将其放入**堆栈(stack )**(箭头3)中进行处理。请记住，如果调用堆栈不是空的，**则事件循环不会将任何回调推入堆栈**。
