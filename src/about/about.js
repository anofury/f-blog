import { lazy, Suspense } from 'react'
import BaseComponent from '../component/BaseComponent'
import { observer } from 'mobx-react'
import Loading from '../component/Loading/Loading'
import BlogHead from '../component/BlogHead/BlogHead'
import BlogBody from '../component/BlogBody/BlogBody'
import { AboutTitle } from 'setting'

import './about.css'

@observer
export default class About extends BaseComponent {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className='blog-about'>
                <BlogHead title={AboutTitle} />
            </div>
        )
    }
}