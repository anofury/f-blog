import { Component } from 'react'
import { configure, action, observable, toJS } from 'mobx'
import { observer } from 'mobx-react'
configure({ enforceActions: 'always' })

@observer
export default class BaseComponent extends Component {
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
        Object.getOwnPropertyNames(obj).forEach(key => {
            this.data[key] = obj[key]
        })
        setTimeout(() => { cb && cb() }, 0)
    }
}