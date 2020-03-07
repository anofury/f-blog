import { lazy, Suspense } from 'react'
import BaseComponent from '../component/BaseComponent'
import { observer } from 'mobx-react'
import Loading from '../component/Loading/Loading'

import './about.css'

@observer
export default class About extends BaseComponent {
    constructor(props) {
        super(props)
    }

    swiperChangeHandle(current) {
        console.log('about swiperChangeHandle', current)
    }

    render() {
        return (
            <div className='ano-about'>
                关于
            </div>
        )
    }
}