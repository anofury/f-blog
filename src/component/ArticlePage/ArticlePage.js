import BaseComponent from '../BaseComponent'
import ReactDOM from 'react-dom'
import { observer } from 'mobx-react'
import BScroll from 'better-scroll'
import ArticleBlock from '../ArticleBlock/ArticleBlock'
import { cns } from '../../utils'

import './ArticlePage.css'

@observer
class ArticlePage extends BaseComponent {
    constructor(props) {
        super(props)
        this.initData({
            show: false,
            showTitle: false,
        })
        this.articleInfo = {}
    }

    show = articleInfo => {
        this.articleInfo = articleInfo
        this.setData({ show: true }, () => {
            this.articlePageBS = new BScroll(this.refs.articlePage, {
                click: true,
                swipeBounceTime: 200,
                eventPassthrough: 'horizontal',
                bounceTime: 400,
                probeType: 3
            })
            this.articlePageBS.on('scroll', pos => {
                if (pos.y < -this.refs.articleHead.offsetHeight) {
                    this.setData({ showTitle: true })
                } else this.setData({ showTitle: false })
            })
        })
    }

    render() {
        const { show, showTitle } = this.data
        return (
            show &&
            <div className='article-page' >
                <div className='page-header' ref='articleHead'>
                    <span className='icon-back'></span>
                    <span className={cns('header-note', { showTitle })}>{showTitle ? this.articleInfo.title : '文章详细'}</span>
                </div>
                <div className='page-content' ref='articlePage'>
                    <div className='page-content-BS'>
                        <ArticleBlock article={this.articleInfo} showAll={true} />
                    </div>
                </div>

            </div>
        )
    }
}

export default ReactDOM.render(<ArticlePage />, document.querySelector('#article'))