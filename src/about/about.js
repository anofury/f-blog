import { observer, BaseComponent } from '../component/BaseComponent'
import BlogHead from '../component/BlogHead/BlogHead'
import BlogBody from '../component/BlogBody/BlogBody'
import { cns } from '../utils'
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
                        <div className='about-note'>
                            <p className='about-blog'>{AboutBlog}</p>
                            <p className='about-blog'>{AboutSomething}</p>
                        </div>
                        <div className='about-me'>{
                            AboutList.map((aboutItem, idx) =>
                                <p className={cns('me-group', { tinyLineBottom: idx < AboutList.length - 1 })} key={idx}>
                                    <span>{aboutItem.title}</span>
                                    <span>{aboutItem.content}</span>
                                </p>
                            )
                        }</div>
                    </div>
                </BlogBody>
            </div>
        )
    }
}