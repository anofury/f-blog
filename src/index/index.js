import { lazy, Suspense } from 'react'
import BaseComponent from '../component/BaseComponent'
import { observer } from 'mobx-react'
import Loading from '../component/Loading/Loading'
import { DialogContext } from '../component/Hoc/HOC'

import './index.css'

@observer
export default class Index extends BaseComponent {
    constructor(props) {
        super(props)
    }

    static contextType = DialogContext

    swiperChangeHandle(current) {
        console.log('index swiperChangeHandle', current)
        // console.log(this.context)
    }

    render() {
        return (
            <div className='ano-index'>
                首页
            </div>
        )
    }
}