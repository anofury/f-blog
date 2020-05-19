import { Component } from 'react'
import { configure, action, observable, toJS } from 'mobx'
import { observer } from 'mobx-react'
configure({ enforceActions: 'always' })

@observer
class BaseComponent extends Component {
    constructor(props) {
        super(props)
    }

    initData = (obj = {}) => {
        this.data = observable(obj)
    }

    get getData() {
        return toJS(this.data)
    }

    @action
    setData = (obj = {}, cb) => {
        let that = this
        Object.getOwnPropertyNames(obj).forEach(key => {
            if (/[\.\[]/.test(key)) {
                try { eval(`that.data.${key}=${obj[key]}`) }
                catch (e) {
                    that.data[key] = obj[key]
                }
            }
            else that.data[key] = obj[key]
        })
        setTimeout(() => { cb && cb() }, 0)
    }
}

export { observer, BaseComponent }