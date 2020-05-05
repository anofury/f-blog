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
                        <p className='about-blog tiny-line-bottom'>{AboutBlog}</p>
                        <div className='about-me'>{
                            AboutList.map((aboutItem, idx) =>
                                <p className='me-group' key={idx}>
                                    <span>{aboutItem.title}</span>
                                    <span>{aboutItem.content}</span>
                                </p>
                            )
                        }</div>
                        <p className='about-something tiny-line-top'>{AboutSomething}</p>
                    </div>
                </BlogBody>
            </div>
        )
    }
}