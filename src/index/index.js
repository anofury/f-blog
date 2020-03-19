import { lazy, Suspense } from 'react'
import BaseComponent from '../component/BaseComponent'
import { observer } from 'mobx-react'
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

    render() {
        const ArticleList = lazy(() => import('./ArticleList/ArticleList'))
        return (
            <div className='blog-index'>
                <BlogHead src='./imgs/avatar.jpg' title={IndexTitle} slogan={Slogan} />
                <BlogBody>
                    <Suspense fallback={<Loading />}>
                        <ArticleList />
                    </Suspense>
                </BlogBody>
            </div >
        )
    }
}