import BaseComponent from '../../component/BaseComponent'
import { observer } from 'mobx-react'
import Loading from '../../component/Loading/Loading'
import Article from '../../component/Article/Article'
import { sleep } from '../../utils'
import { Articles, ArticleSinglePageNum } from 'setting'

import './ArticleList.css'

@observer
export default class ArticleList extends BaseComponent {
    constructor(props) {
        super(props)
        this.initData({
            loadingMore: false,
            noMore: false,
            displayFlags: new Array(Articles.length).fill(false)
        })
    }

    onArticleLoaded = () => {
        clearTimeout(this.loadingMoreTimer)
        this.setData({ loadingMore: false })
    }

    onArticleLoadError = articleInfo => {
        clearTimeout(this.loadingMoreTimer)
        let newDisplayFlags = this.getData.displayFlags
        newDisplayFlags.some((val, idx) => {
            if (articleInfo.hash === Articles[idx].hash) {
                newDisplayFlags[idx] = false
                return true
            }
        })
        this.setData({ displayFlags: newDisplayFlags })
    }

    loadMoreArticles = () => {
        let newDisplayFlags = this.getData.displayFlags, count = 0
        newDisplayFlags.forEach((val, idx) => {
            if (!val && count < ArticleSinglePageNum) {
                newDisplayFlags[idx] = true
                count++
            }
        })
        if (!count) {
            sleep(200).then(() => {
                this.setData({ noMore: true })
            })
        }
        else {
            this.setData({ displayFlags: newDisplayFlags })
            this.loadingMoreTimer = setTimeout(() => {
                this.setData({ loadingMore: true })
            }, 200)
        }
    }

    componentWillMount() {
        this.loadMoreArticles()
    }

    render() {
        const { noMore, displayFlags, loadingMore } = this.data
        return (
            <div className='article-list'>
                {
                    Articles.map((article, idx) =>
                        displayFlags[idx] && <Article key={idx} article={article} showAll={false}
                            loaded={this.onArticleLoaded} error={this.onArticleLoadError}
                        />
                    )
                }
                {
                    <div className='article-load-more'>{
                        loadingMore ? <Loading hidden={!loadingMore} style={{ padding: '.2rem' }} />
                            : noMore ? <span className='no-more'>这是底线</span>
                                : <span onClick={this.loadMoreArticles}>︾</span>
                    }</div>
                }
            </div>
        )
    }
}