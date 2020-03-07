import { lazy, Suspense } from 'react'
import BaseComponent from '../component/BaseComponent'
import { observer } from 'mobx-react'
import Loading from '../component/Loading/Loading'

import './archive.css'

@observer
export default class Archive extends BaseComponent {
    constructor(props) {
        super(props)
    }

    swiperChangeHandle(current) {
        console.log('archive swiperChangeHandle', current)
    }

    render() {
        return (
            <div className='ano-archive'>
                归档
            </div>
        )
    }
}