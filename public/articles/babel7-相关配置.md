---
title: babel7-相关配置
description: babel7-相关配置
date: 2020-05-14 12:17:54
categories: Web-Frontend
tags: 代码, 笔记, webpack, babel7
---

## babel.config.js

`babel7` 开始加入 `babel.config.js` 全局配置文件，默认不会使用任何子 `package` 中的相对配置文件，但可以通过配置 `babelrcRoots ` 字段来加载指定的子 `package` 中的相对配置文件。（父 `package` 自身的 `babelrc` 是默认可用的）

``` javascript
module.exports = {
    babelrcRoots: [
        './fonts/'
    ],
    exclude: /node_modules/
}
```

<!-- more -->

## .babelrc/.babelrc.js

相对配置文件，只作用于所在目录，如果在子 `package` 中需要使用全局配置 `babel.config.js` ，可以通过设置 `rootMode` 字段来读取全局配置。

``` javascript
{
    "rootMode": "upward"
    // 会自动向上寻找全局配置，并确定项目的根目录位置
}
```

## @babel/polyfill

由 `core-js2` 和 `regenerator-runtime` 组成的一个集成包， `@babel/polyfill` 在 `babel7.4.0` 不再推荐使用，所以 `core-js` 官方推荐使用 `polyfill` 的时候直接引入 `core-js` 和 `regenerator-runtime/runtime` 这两个包完全取代 `@babel/polyfil` 来为了防止重大更改。

## @babel/preset-env 

`babel7` 中废除了 `preset-stage` 预设，并且可以完全告别 `preset-es2015/es2016/es2017/latest` 这个几个历史预设。对于 `proposal ` 阶段的语法，需要自行选择插件，如 `@babel/plugin-proposal-function-bind` ，除此之外使用预设 `preset-env ` 就足够了，它会根据 `compat-table` 和 `targets` 来自动选择正确的插件来进行语法转换。

### 常用参数

#### modules

"amd" | "umd" | "systemjs" | "commonjs" | "cjs" | "auto" | false，默认为"auto"，将 ES6 模块语法转换为其他模块类型的功能。

#### targets

目标浏览器，尽量把该配置写到 `.browserslistrc` 或者 `package.json` 的 `browserslist` 中，以便其他工具一同使用

#### core-js

* 2：使用 `corejs2` ，则根据 `useBuiltIns` 参数来决定使用 `@babel/polyfill` 的方式；
* 3：使用 `corejs3` ，则用以下代码取代 `@babel/polyfill` ；

``` javascript
import "core-js/stable"
import "regenerator-runtime/runtime"
```

#### useBuiltIns

有 `“entry”、”usage”、false ` 三个值。默认值是 false，此参数决定了 `babel ` 打包时如何处理 `@babel/polyfill ` 语句：

* entry：会将文件中 `import‘@babel/polyfill’` 语句结合 targets ，转换为一系列引入语句，去掉目标浏览器已支持的 `polyfill` 模块，不管代码里有没有用到，只要目标浏览器不支持都会引入对应的 `polyfill` 模块；
* usage：不需要手动在代码里写 `import ‘@babel/polyfill’` ，打包时会自动根据实际代码的使用情况，结合 `targets ` 引入代码里实际用到部分 `polyfill` 模块；
* false：对 `import ‘@babel/polyfill’` 不作任何处理，也不会自动引入 `polyfill ` 模块。

### 注意

* 在 `webpack ` 打包文件配置的 `entry ` 中引入的 `@babel/polyfill` 不会根据 `useBuiltIns` 配置任何转换处理；
* 不建议使用 `import‘@babel/polyfill’` 一次性引入所有的 `polyfill ` 文件，会全局引入整个 `polyfill` 包，比如 `promise` 会全局引入，污染全局环境。

### 总结

在业务项目中需要用到 `polyfill` 时, 可以使用和 `@babel/preset-env` 的 `targets` 和 `useBuiltIns: usage` 来根据目标浏览器的支持情况，按需引入用到的 `polyfill` 文件。

[ECMAScript 6 compatibility table](http://kangax.github.io/compat-table/es6/)

## @babel/runtime

比如 `_createClass` 是将 `es6 class` 关键字转化成 `es5` 语法 时生成的一个函数，如果有多个 `js` 文件中都定义了 `class` 类，那么在编译转化时就会产生大量相同的 `_createClass` 方法， ` @babel/runtime` 可以提供统一的模块化的 `helper` ，减少冗余代码。

## @babel/plugin-transform-runtime(配合@babel/runtime使用)

* 如果配置参数 `corejs` 未设置或为 `false` ，需安装依赖 `@babel/runtime` ，仅对 `ES6` **语法**转译，而不对新 API 转译；
* 如果配置参数 `corejs` 设置为 2 或者 3，则需要安装对应依赖 `@babel/runtime-corejs2` 、 `@babel/runtime-corejs3` ，与 `@babel/runtime` 的区别在于增加了 `core-js` （ES6 中新 **API** 的 polyfill 库）这个库的依赖，其中 `@babel/runtime-corejs3` 越高版本代表支持的新 `ES` 语法越多，此插件的 `core-js` 配置项可以给这些polyfill提供一个沙箱环境，好处在于不会污染全局变量。

[preset-env + transform-runtime + runtime-corejs2](https://segmentfault.com/a/1190000020237785)

[corejs3 的更新](https://segmentfault.com/a/1190000020237817)
