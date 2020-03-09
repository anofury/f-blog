import BaseComponent from '../BaseComponent'
import ReactDOM from 'react-dom'
import { observer } from 'mobx-react'
import BScroll from 'better-scroll'
import ArticleBlock from '../ArticleBlock/ArticleBlock'
import { cns, sleep } from '../../utils'

import './ArticlePage.css'

@observer
class ArticlePage extends BaseComponent {
    constructor(props) {
        super(props)
        this.initData({
            show: false,
            close: false,
            showTitle: false,
        })
        this.articleInfo = {}
    }

    show = articleInfo => {
        this.articleInfo = articleInfo
        this.setData({ show: true, close: false, showTitle: false }, () => {
            this.articlePageBS = new BScroll(this.refs.articlePage, {
                click: true,
                // swipeBounceTime: 200,
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
        let pushStateState = {
            title: '文章详细', url: `#/article_title=${this.articleInfo.title}`
        }
        window.history.pushState(pushStateState, pushStateState.title, pushStateState.url)
        window.addEventListener("popstate", this.close, false)
    }

    close = () => {
        window.removeEventListener("popstate", this.close, false)
        this.setData({ close: true }, () => {
            sleep(400).then(() => {
                this.setData({ show: false, close: false, showTitle: false })
                this.articlePageBS.destroy()
            })
        })
    }

    onTapCloseArticlePage = () => {
        window.history.back()
    }

    render() {
        const { show, close, showTitle } = this.data
        return (
            show &&
            <div className={cns('article-page', { close })} >
                <div className='article-page-header' ref='articleHead'>
                    <p>
                        <span className='article-header-back icon-back' onClick={this.onTapCloseArticlePage}></span>
                        <span className='article-header-note'>文章详细</span>
                    </p>
                    <span className={cns('article-header-title', { show: showTitle })}>{this.articleInfo.title}</span>
                </div>
                <div className='article-page-content' ref='articlePage'>
                    <div className='article-page-content-BS'>
                        <ArticleBlock article={this.articleInfo} showAll={true} />
                    </div>
                </div>

            </div>
        )
    }
}

export default ReactDOM.render(<ArticlePage />, document.querySelector('#article'))