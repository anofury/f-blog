import BaseComponent from '../../component/BaseComponent'
import { observer } from 'mobx-react'
import Loading from '../../component/Loading/Loading'
import Article from '../../component/Article/Article'
import { Articles, ArticleSinglePageNum } from 'setting'

import './ArticleList.css'

@observer
export default class ArticleList extends BaseComponent {
    constructor(props) {
        super(props)
        this.initData({
            hasArticleLoaded: false,
            displayFlags: new Array(Articles.length).fill(false)
        })
    }

    onArticleLoaded = () => {
        if (!this.getData.hasArticleLoaded) {
            this.setData({
                hasArticleLoaded: true
            })
        }
    }

    loadMoreArticles = () => {
        let newDisplayFlags = this.getData.displayFlags, count = 0
        newDisplayFlags.forEach((val, idx) => {
            if (!val && count < ArticleSinglePageNum) {
                newDisplayFlags[idx] = true
                count++
            }
        })
        this.setData({
            displayFlags: newDisplayFlags
        })
    }

    componentWillMount() {
        this.loadMoreArticles()
    }

    render() {
        const { hasArticleLoaded, displayFlags } = this.data
        return (
            <div className='article-list'>
                <Loading style={{ position: 'absolute' }} hidden={hasArticleLoaded} />
                {
                    Articles.map((article, idx) =>
                        displayFlags[idx] && <Article key={idx} article={article} showAll={false}
                            loaded={this.onArticleLoaded}
                        />
                    )
                }
                {
                    displayFlags.includes(false) &&
                    <button className='article-load-more' onClick={this.loadMoreArticles}>更多文章</button>
                }
            </div>
        )
    }
}