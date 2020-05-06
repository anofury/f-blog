---
title: javascript初级
description: javascript初级笔记
date: 2019-12-14 15:46:39
categories: Web-Frontend
tags: 代码, 笔记, JavaScript
---

## Object

 js中有六种数据类型，包括五种基本数据类型（Number,String,Boolean,Undefined,Null）,和一种复杂数据类型（Object）。三大引用类型：Object，Array，Function

判断对象是否存在属性：`‘name’ in obj`、

```javascript
let a = {b: 3}
a.hasOwnProperty('b') 
// true
// 不能直接以字面量形式使用 hasOwnProperty 判断，如 {b: 3}.hasOwnProperty()
```

获取对象的`keys`：`Object.getOwnPropertyNames({})`、`obj.keys()`，`obj`不能以字面量形式

对象不能添加新属性，原有属性不能更改，原有属性的属性可以更改：`Object.freeze()`

对象不能添加新属性，原有属性可以更改：`Object.seal()`

对象的深拷贝：`JSON.parse(JSON.stringify(Obj))`，注意它的性能不是特别好，而且无法处理闭环的引用

<!-- more -->

```javascript
const obj = {
    a: 1
};
obj.b = obj;
JSON.parse(JSON.stringify(obj)) // Uncaught TypeError: Converting circular structure to JSON
```

对象的浅拷贝：`Object.assign(target, ...sources) ` ，（只会深拷贝第一层，再层数则是引用）

判断数据类型：`Object.prototype.toString.call(obj) == "[object Array]"`

## ~ 按位取反

- 原码即符号位加上真值的绝对值， 即用第一位表示符号， 其余位表示值
- 反码即正数的反码是其本身，负数的反码是在其原码的基础上， 符号位不变，其余各个位取反
- 补码即正数的补码就是其本身，负数的补码是在其原码的基础上， 符号位不变， 其余各位取反， 最后+1 (即在反码的基础上+1)

| 十进制数 | 原码      | 反码      | 补码      |
| -------- | --------- | --------- | --------- |
| 85       | 0101 0101 | 0101 0101 | 0101 0101 |
| -85      | 1101 0101 | 1010 1010 | 1010 1011 |
| 9        | 0000 1001 | 0000 1001 | 0000 1001 |
| -9       | 1000 1001 | 1111 0110 | 1111 0110 |

~表示按位取反，~5的运行步骤为：

- 转为一个字节的二进制表示：00000101
- 按位取反：11111010
- 取其反码：10000101
- 取其补码：10000110
- 转化为十进制：-6

## ~~ 双非按位取反运算符

- 对于正数，它向下取整
- 对于负数，向上取整
- 非数字取值为0

| 原值 | Math.floor() | ~~   |
| ---- | ------------ | ---- |
| 5.1  | 5            | 5    |
| -5.1 | -6           | -5   |

```javascript
~~null;       // => 0
~~undefined;  // => 0
~~Infinity;   // => 0
~~NaN;        // => 0
~~0;          // => 0
~~{};         // => 0
~~[];         // => 0
~~(1/0);      // => 0
~~false;      // => 0
~~true;       // => 1
~~1.9;        // => 1
~~-1.9;       // => -1

// 作用就是去除一个数的小数部分
console.log(Math.trunc(42.7)) // 42
console.log(Math.trunc(0.1) // 0
console.log(Math.trunc(-0.1)) // -0
```

1.Math.trunc()作用就是去除一个数的小数部分。

2.Math.trunc() 会先使用Number将其先转为数值

console.log(parseInt('13.14g'));//13
console.log(Math.trunc('13.14g'));//NaN
console.log(parseInt(6.022e23)); // 6
console.log(Math.trunc(6.022e23)); // 6.022e+23
console.log(parseInt(0.00000060));//6
console.log(Math.trunc(0.00000060));//0
为什么会是6呢？
如果出现连续的超过6个及其以上连续的6个0会自动改成科学计数法：
parseInt() 函数解析一个字符串参数，并返回一个指定基数的整数 (数学系统的基础)。 
parseInt 函数将其第一个参数转换为字符串，解析它，并返回一个整数或NaN。如果不是NaN，返回的值将是作为指定基数（基数）中的数字的第一个参数的整数。
3.相对于Math.ceil()和Math.floor()的优点：对于数值的正负情况不一样时不用分别考虑了

之前：x<0?Math.ceil(x):Math.floor(x)
现在：Math.trunc(x)


## 获取查询字符串参数 `URLSearchParams` 

```javascript
var paramsString = "q=URLUtils.searchParams&topic=api";
var searchParams = new URLSearchParams(paramsString);

//Iterate the search parameters.
for (let p of searchParams) {
  console.log(p);
}

searchParams.has("topic") === true; // true
searchParams.get("topic") === "api"; // true
searchParams.getAll("topic"); // ["api"]
searchParams.get("foo") === null; // true
searchParams.append("topic", "webdev");
searchParams.toString(); // "q=URLUtils.searchParams&topic=api&topic=webdev"
searchParams.set("topic", "More webdev");
searchParams.toString(); // "q=URLUtils.searchParams&topic=More+webdev"
searchParams.delete("topic");
searchParams.toString(); // "q=URLUtils.searchParams"
```

## Array.prototype.sort

- `Array.prototype.sort()` 默认根据字符串的 `Unicode` 编码进行排序，具体算法取决于实现的浏览器
- 在 v8 引擎中，若数组长度小于10则使用插入排序，大于10则使用快排

简单打乱数组：

```javascript
[1, 2, 3, 4].sort(() => .5 - Math.random())
```

*但是以上的实现并不是完全随机的，究其原因，还是因为排序算法的不稳定性，导致一些元素没有机会进行比较*

**Fisher–Yates shuffle 算法：完全随机**

```javascript
function shuffle(arrs) {
    for (let i = arrs.length - 1; i > 0; i -= 1) {
        const random = Math.floor(Math.random() * (i + 1));
        [arrs[random], arrs[i]] = [arrs[i], arrs[random]];
    }
}
```

## Array.prototype.length

- 它通常用于返回数组的长度，但是也是一个包含有复杂行为的属性
- 并不是用于统计数组中元素的数量，而是代表数组中最高索引的值

```javascript
const arrs = [];
arrs[5] = 1;
console.log(arrs.length); // 6

const arrs = [1, 2, 3];
delete arrs[2];  // 长度依然为3

const arrs = [1, 2, 3, 4];
arrs.length = 2; // arrs = [1, 2]
arrs.length = 0; // arrs = []

const arrs = [1, 2];
arrs.length = 5; // arrs = [1, 2,,,,] 稀疏数组

let a = [1, 2, 3];
let b = [1, 2, 3];
let a1 = a;
let b1 = b;
a = [];
b.length = 0;
console.log(a, b, a1, b1); // [], [], [1, 2, 3], []
```

## 使用 Set 对象创建一个惟一的元素列表

```javascript
const list = [1, 2, 3, 5, 2, 5, 7];
const uniqueList = [...new Set(list)];

Array.from(new Set(list));
```

## 数组 map 的方法 (不使用Array.Map)

```javascript
const cities = [
    { name: 'Paris', visited: 'no' },
    { name: 'Lyon', visited: 'no' },
    { name: 'Marseille', visited: 'yes' },
    { name: 'Rome', visited: 'yes' },
    { name: 'Milan', visited: 'no' },
    { name: 'Palermo', visited: 'yes' },
    { name: 'Genoa', visited: 'yes' },
    { name: 'Berlin', visited: 'no' },
    { name: 'Hamburg', visited: 'yes' },
    { name: 'New York', visited: 'yes' }
];

const cityNames = Array.from(cities, ({ name}) => name);
console.log(cityNames);
// ["Paris", "Lyon", "Marseille", "Rome", "Milan", "Palermo", "Genoa", "Berlin", "Hamburg", "New York"]
```

## 有条件的对象属性

```javascript
{...true && { email : '123@123.com' }}
// {email: "john@doe.com"}

{...false && { email : '123@123.com' }}
// {}
```

## 将原始值列表转换为另一种类型

```javascript
const naiveList = ['1500', '1350', '4580'];
const castedList = naiveList.map(Number);
console.log(castedList) // [1500, 1350, 4580]
```

## 扁平嵌套的数组

```javascript
const nestedList = [133, 235, 515, [513, 15]];
const flattenList = nestedList.flat();
console.log(flattenList) //  [133, 235, 515, 513, 15]
```

## 生成指定数组

```javascript
let array = Array(5).fill('');
console.log(array); 
// ["", "", "", "", ""]

Array.apply(null, Array(5)).map(e => 1)
// [1, 1, 1, 1, 1]

Array.apply(null, Array(3)).map(Function.prototype.call.bind(Number))
// [0,1,2]

Array.apply(null, Array(3)).map(Function.prototype.call, Number)
// [0,1,2]
```

## 为数字添加千分位分隔符

```javascript
numFormat(num = 0) {
    var string = `${num}`
    if (+num.toLocaleString)
        return +num.toLocaleString('en-US') // 中文下默认为 en-US，国外环境下需要手动设置 en-US
    else if (string.indexOf('.') + 1)
        return string.replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
    else return string.replace(/(\d)(?=(\d{3})+$)/g, '$1,')
}

// ES6
var l10nEN = new Intl.NumberFormat("en-US")
var l10nDE = new Intl.NumberFormat("de-DE")
l10nEN.format(1234567.89) === "1,234,567.89"
l10nDE.format(1234567.89) === "1.234.567,89"
```

## document 事件

- 事件
  - onload：当DOM元素加载完成，并且资源全部加载完成之后
  - DOMContentLoaded：当DOM元素加载完成
  - onreadystatechange：`document.readyState` 的值发生变化
- document.readyState
  - loading：加载：document 仍在加载。
  - interactive：互动：文档已经完成加载，文档已被解析，但是诸如图像，样式表和框架之类的子资源仍在加载。
  - complete：完成：文档和所有子资源已完成加载。状态表示 load 事件即将被触发。

## 一些事件

- onchange触发事件必须满足两个条件：
  - 当前对象属性改变，并且是由键盘或鼠标事件激发的（脚本触发无效）
  - 当前对象失去焦点(onblur)
- onpropertychange的话，只要当前对象属性发生改变，都会触发事件，但是它是IE专属的；
- oninput是onpropertychange的非IE浏览器版本，支持firefox和opera等浏览器，但有一点不同，它绑定于对象时，并非该对象所有属性改变都能触发事件，它只在对象value值发生改变时奏效。

`iOS` 下 `input file` 必须插入到 `dom` 里并且不能是`display: none`，否则不会触发 `onchange` 事件

## window

- onpopstate：点击前进回退按钮触发
- window.history
  - window.history.back() 等同于  window.history.go(-1)
  - window.history.forward() 等同于window.history.go(1)
  - window.history.pushState()：可以改变referrer，在不刷新浏览器的情况下，创建新的浏览记录并插入浏览记录队列中
  - window.history.replaceState()：和 `pushState() ` 方法不会触发 `window.onpopstate` 事件
  - window.history.length：获取历史堆栈中页面的数量

## call

call(对象, 参数1, 参数2, ...)

伪数组转真数组：`[].slice.call(obj)`

## apply

apply(对象, [数组]);

真数组转伪数组：`[].push.apply(obj, arr)`

## 高度、宽度

`document.documentElement.clientHeight == window.innerHeight == document.body.clientHeight`

- clientTop：容器内部相对于容器本身的top偏移，实际就是 上 border-width
- offsetTop：当前元素顶部距离最近定位父元素顶部的距离，单位px，只读元素。
- scrollTop： 代表在有滚动条时，滚动条向下滚动的距离也就是元素顶部被遮住部分的高度。在没有滚动条时scrollTop==0恒成立。单位px，可读可设置。
- clientHeight：内部可视区高度，样式的height+上下padding
- scrollHeight：内容的实际高度+上下padding（如果没有限制div的height，即height是自适应的，一般是scrollHeight==clientHeight）
- offsetHeight：div的可视高度，样式的height+上下padding+上下border-width。
- window.screen.height：屏幕分辨率的高
- window.screen.width：屏幕分辨率的宽

## invoke 注意

如果引用的是属于 `window` 的方法，则方法里的 `this` 必须是 `window`

```js
Engine.prototype.requestAnimationFrame = 
        (window.requestAnimationFrame && window.requestAnimationFrame.bind(window)) ||
        (window.webkitRequestAnimationFrame && window.webkitRequestAnimationFrame.bind(window)) ||
        //etc...
```

## getBoundingClientRect

## IntersectionObserver

## MutationObserver

[Javascript中的黑话](https://mp.weixin.qq.com/s/-ysQaxpQwSYzIM0sEbHB3A)

[JS10个常用的技巧和鲜为人知的特性](https://segmentfault.com/a/1190000020522097)
