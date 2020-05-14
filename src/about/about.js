import { lazy, Suspense } from 'react'
import BaseComponent from '../component/BaseComponent'
import { observer } from 'mobx-react'
import Loading from '../component/Loading/Loading'
import BlogHead from '../component/BlogHead/BlogHead'
import BlogBody from '../component/BlogBody/BlogBody'
import { AboutTitle, AboutList, AboutBlog, AboutSomething } from 'setting'

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
                <BlogBody>
                    <div className='about-container'>
                        <p className='about-blog '>{AboutBlog}</p>
                        <div className='about-me tiny-border'>{
                            AboutList.map((aboutItem, idx) =>
                                <p className='me-group tiny-line-bottom' key={idx}>
                                    <span>{aboutItem.title}</span>
                                    <span>{aboutItem.content}</span>
                                </p>
                            )
                        }</div>
                        <p className='about-something'>{AboutSomething}</p>
                    </div>
                </BlogBody>
            </div>
        )
    }
}