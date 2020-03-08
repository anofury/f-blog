import { lazy, Suspense } from 'react'
import BaseComponent from '../component/BaseComponent'
import { observer } from 'mobx-react'
import BScroll from 'better-scroll'
import Image from '../component/Image/Image'
import Loading from '../component/Loading/Loading'
import { Title, Slogan } from 'setting'

import './index.css'

@observer
export default class Index extends BaseComponent {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.indexBodyBS = new BScroll(this.refs.indexBody, {
            click: true,
            swipeBounceTime: 200,
            eventPassthrough: 'horizontal',
            bounceTime: 400,
            // bounce: false
        })
    }

    render() {
        const ArticleList = lazy(() => import('./component/ArticleList/ArticleList'))
        return (
            <div className='ano-index'>
                <div className='index-header'>
                    <div className='header-user' onClick={() => { this.props.moveToPosition('last') }}>
                        <Image src='./imgs/avatar.jpg' />
                    </div>
                    <div className='header-title'>{Title}</div>
                    <div className='header-slogan'>{Slogan}</div>
                </div>
                <div className='index-body' ref='indexBody'>
                    <div className='index-body-BS'>
                        <Suspense fallback={<Loading />}>
                            <ArticleList />
                        </Suspense>
                    </div>
                </div>
            </div >
        )
    }
}