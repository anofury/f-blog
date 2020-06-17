import { lazy, Suspense } from 'react'
import { observer, BaseComponent } from '../component/BaseComponent'

import BlogHead from '../component/BlogHead/BlogHead'
import BlogBody from '../component/BlogBody/BlogBody'
import Loading from '../component/Loading/Loading'
import { IndexTitle, Slogan } from 'setting'

import './index.css'

@observer
export default class Index extends BaseComponent {
    constructor(props) {
        super(props)
    }

    swiperChangeHandle(current) {
        this.refs.blogBody
            && this.refs.blogBody.swiperChangeHandle
            && this.refs.blogBody.swiperChangeHandle(current)
    }

    render() {
        const ArticleList = lazy(() => import('./ArticleList/ArticleList'))
        return (
            <div className='blog-index'>
                <BlogHead src='./imgs/avatar.jpg' title={IndexTitle} slogan={Slogan} avatarClick={this.props.moveToPosition} />
                <BlogBody ref='blogBody'>
                    <Suspense fallback={<Loading />}>
                        <ArticleList />
                    </Suspense>
                </BlogBody>
            </div >
        )
    }
}