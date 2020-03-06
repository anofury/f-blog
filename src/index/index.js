import BaseComponent from '../component/BaseComponent'
import { observer } from 'mobx-react'

import './index.css'

@observer
export default class Index extends BaseComponent {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className='ano-index'>
                首页
            </div>
        )
    }
}