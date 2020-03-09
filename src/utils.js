/**
 * 时间格式化
 * @param {Date} date Date 对象或者可以被转化为 Date 对象
 * @param {String} fmt 格式化后的形式，默认为 YYYY-MM-DD hh:mm:ss
 * @returns {String} 格式化后的时间
 */
function dateFormat(date = new Date(), fmt = 'YYYY-MM-DD hh:mm:ss') {
    date = isNaN(+date) ? new Date(date) : new Date(+date)
    let o = {
        'M+': date.getMonth() + 1,                   //月份
        'D+': date.getDate(),                        //日
        'h+': date.getHours(),                       //小时
        'm+': date.getMinutes(),                     //分
        's+': date.getSeconds(),                     //秒
        'q+': Math.floor((date.getMonth() + 3) / 3), //季度
        'S': date.getMilliseconds()                  //毫秒
    }
    if (/(Y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, `${date.getFullYear()}`.substr(4 - RegExp.$1.length))
    for (let k in o)
        if (new RegExp(`(${k})`).test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : ((`00${o[k]}`).substr(`${o[k]}`.length)))
    return fmt
}

/**
 * 为数字添加千位分隔符
 * @param {[Number,String]} num 原始数字
 * @returns {String} 添加千位分隔符后的字符串
 */
function numFormat(num = 0) {
    let string = `${num}`
    if (+num.toLocaleString)
        return +num.toLocaleString('en-US') // 中文下默认为 en-US，国外环境下需要手动设置 en-US
    else if (string.indexOf('.') + 1)
        return string.replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
    else return string.replace(/(\d)(?=(\d{3})+$)/g, '$1,')
}

/**
 * 数字前面补0
 * @param {[Number,String]} num 原始数字
 * @param {Number} len 补0后的长度
 * @returns {String} 补0后的字符串
 */
function zfill(num = 0, len = 2) {
    num = `${num}`
    if (num.length < len)
        return Array.apply(null, new Array(len - num.length)).map(_ => 0).join('') + num
    else return num
}

/**
 * 生成指定长度、指定相同内容的数组
 * @param {Object} content 数组单项内容
 * @param {Number} len 要生成的数组长度
 * @returns {Array} 生成后的数组
 */
function generateArray(content = undefined, len = 1) {
    return Array.apply(null, new Array(len)).map(_ => content)
}

/**
 * 判断对象类型
 * @param {Object} obj 要判断的对象
 * @param {String} type 要判断的类型
 * @returns {Boolean} 判断后的 bool 值结果
 */
function isType(obj, type) {
    return Object.prototype.toString.call(obj).toLowerCase() === `[object ${type.toLowerCase()}]`
}

/**
 * 判断两个对象是否类型一致
 * @param {Object} obj1 对象1
 * @param {Object} obj2 对象2
 * @returns {Boolean} 判断后的 bool 值结果
 */
function isSameType(obj1, obj2) {
    return Object.prototype.toString.call(obj1) === Object.prototype.toString.call(obj2)
}

/**
 * 判断两个对象是否值相等
 * @param {Object} obj1 对象1
 * @param {Object} obj2 对象2
 * @param {[Array,String,Number]} eKeys 比较键值对形式对象中需要忽略的的键
 * @returns {Boolean} 
 */
function isEqual(obj1, obj2, eKeys) {
    let type1 = Object.prototype.toString.call(obj1),
        type2 = Object.prototype.toString.call(obj2),
        type3 = Object.prototype.toString.call(eKeys)

    if (eKeys && (/Array|String|Number/).test(type3))
        eKeys = [...(eKeys.length ? eKeys.map(String) : [`${eKeys}`])]
    else eKeys = undefined

    if (type1 !== type2) return false
    if ((/Function|Symbol/).test(type1)) return false
    if ((/Number|String|Boolean/).test(type1)) return obj1 === obj2
    if ((/Object|Array/).test(type1)) {
        let pNames1 = Object.getOwnPropertyNames(obj1),
            pNames2 = Object.getOwnPropertyNames(obj2)

        if (eKeys && (/Object/).test(type1)) {
            let tmpPNames1 = [...pNames1],
                tmpPNames2 = [...pNames2]
            eKeys.forEach(item => {
                if (tmpPNames1.indexOf(item) + 1) tmpPNames1.splice(tmpPNames1.indexOf(item), 1)
                if (tmpPNames2.indexOf(item) + 1) tmpPNames2.splice(tmpPNames2.indexOf(item), 1)
            })
            if (tmpPNames1.length !== tmpPNames2.length) return false
        }
        else if (pNames1.length !== pNames2.length) return false
        for (let key in obj1) {
            if (eKeys && (eKeys.indexOf(key) + 1)) continue
            if (!(key in obj2) || !isEqual(obj1[key], obj2[key], eKeys)) return false
        }
    }
    return true
}

/**
 * 深拷贝对象
 * @param {Object} obj 
 * @returns {Object} 深拷贝后的对象
 */
function deepCopy(obj) {
    let newObj, type = Object.prototype.toString.call(obj)
    if (/Array/.test(type)) newObj = new Array(obj.length)
    else if (/Object/.test(type)) newObj = {}
    else newObj = obj

    if ((/Object|Array/).test(type))
        for (let key in obj) newObj[key] = deepCopy(obj[key])

    return newObj
}

/**
 * 预加载图片
 * @param {Array} imgArr 需要提前加载的图片
 * @param {Function} callback 加载成功的回调函数
 */
function preLoadImg(imgArr, callback) {
    if (isType(imgArr, 'string')) imgArr = [imgArr]
    const promiseAll = imgArr.map(item => {
        return new Promise((resolve, reject) => {
            let img = new Image()
            img.onload = () => {
                img.onload = null
                resolve(img)
            }
            img.error = () => {
                reject('PreLoadImg failed.')
            }
            img.src = item
        })
    })
    return new Promise((reslove, reject) => {
        Promise.all(promiseAll).then(
            (imgs) => {
                reslove(imgs)
            }, err => {
                reject(err)
            }
        )
    })
}

/**
 * className 为驼峰式，会将驼峰式转换成 - 连接
 * @param {String} beseClass
 * @param {Object} obj 对象，Eg: {btn: true}
 * @returns {String} 拼接后的类字符串
 */
function cns(beseClass = '', obj = {}) {
    let cnsRet = '', objRet = {}
    for (let idx in arguments) {
        let arg = arguments[idx]
        if (isType(arg, 'string')) cnsRet = cnsRet + (cnsRet ? ` ${arg}` : arg)
        if (isType(arg, 'object')) objRet = Object.assign({}, objRet, arg)
    }

    Object.getOwnPropertyNames(objRet).forEach((key, idx) => {
        if (objRet[key]) {
            let cnsItem = key.replace(/([0-9a-z_])([A-Z])/g, '$1-$2').split('-')
            if (cnsItem.length - 1) {
                cnsItem = cnsItem.map(part =>
                    part.replace(part[0], part[0].toLowerCase())
                ).join('-')
            }
            cnsRet = cnsRet + (cnsRet ? ` ${cnsItem}` : cnsItem)
        }
    })
    return cnsRet
}

/**
 * 复制 DOM 元素的 clipText 属性内容到剪切板
 * @param {Object} ele DOM元素
 */
function clipTextToBoard(ele) {
    let textArea = document.createElement('textarea')
    textArea.style.position = 'absolute'
    textArea.style.left = '-9999px'
    textArea.style.opacity = '0'
    textArea.setAttribute('readonly', '')
    textArea.value = ele.target ? ele.target.getAttribute('clipText') : ele
    document.body.appendChild(textArea)
    textArea.select()
    return new Promise((resolve, reject) => {
        document.execCommand('copy') ? resolve(true) : resolve(false)
        document.body.removeChild(textArea)
    })
}

/**
 * 延时 promise
 * @param {Number} delay 延时时长
 * @returns {Promise} 
 */
function sleep(delay = 200) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, delay)
    })
}

function isAndroid() {
    return /android/.test(window.navigator.userAgent.toLowerCase())
}

function isIphone() {
    return /iphone/.test(window.navigator.userAgent.toLowerCase())
}

/**
 * 是否为安卓或者苹果手机
 *  @returns {Boolean} 
 */
function isMobile() {
    return isAndroid() || isIphone()
}

module.exports = {
    dateFormat, isType, cns, preLoadImg, clipTextToBoard,
    sleep, isAndroid, isIphone, isMobile, zfill, isEqual,
    deepCopy,
}