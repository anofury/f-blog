import { lazy, Suspense } from 'react'
import BaseComponent from '../component/BaseComponent'
import { observer } from 'mobx-react'
import Loading from '../component/Loading/Loading'
import { ArchiveIitle } from 'setting'

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
                <div className='archive-header'>
                    <div className='header-title'>{ArchiveIitle}</div>
                </div>
            </div>
        )
    }
}