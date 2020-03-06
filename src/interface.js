import { PROAPI, DEVAPI } from 'setting'

const fetchParam = {
    // 公告
    announcement: {
        id: 'announcement',
        path: 'api.v1.announcement.query',
        post: true,
        param: {}
    },
    // 蜜言
    oath: {
        id: 'oath',
        path: 'api.v1.daily.oath',
        post: false,
        param: {}
    },
    // 词霸
    ciba: {
        id: 'ciba',
        path: 'api.v1.daily.ciba',
        post: false,
        param: {}
    },
    // one·一个
    yige: {
        id: 'yige',
        path: 'api.v1.daily.yige',
        post: false,
        param: {
            pre: 0
        }
    },
    // 句读
    judou: {
        id: 'judou',
        path: 'api.v1.daily.judou',
        post: false,
        param: {}
    },
    // 句读 - 评论
    judouSentences: {
        id: 'judou_sentences',
        path: 'api.v1.daily.judou.sentences',
        post: false,
        param: {
            uuid: ''
        }
    }
}


// 请求方法
function OKFetch(param, extendParam = {}) {
    const url = `${extendParam.dev ? DEVAPI : PROAPI}${param.path.replace(/\./g, '/')}/`
    const bodyParam = Object.assign({}, param.param, extendParam)
    return new Promise((reslove, reject) => {
        if (param.post) {
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                body: Object.keys(bodyParam).map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(bodyParam[key])).join('&')
            }).then(resp => resp.json())
                .then(resp => {
                    if (resp.code === 200) {
                        reslove(resp)
                    } else reject(resp)
                }).catch(err => { reject(err) })
        }
        else {
            fetch(`${url}?${Object.keys(bodyParam).map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(bodyParam[key])).join('&')}`).then(resp => resp.json())
                .then(resp => {
                    if (resp.code === 200) {
                        reslove(resp)
                    } else reject(resp)
                }).catch(err => { reject(err) })
        }
    })
}

export { OKFetch, fetchParam }