import BaseComponent from '../../../component/BaseComponent'
import { observer } from 'mobx-react'
import Loading from '../../../component/Loading/Loading'
import ArticleItem from '../ArticleItem/ArticleItem'
import { Articles } from 'setting'

import './ArticleList.css'

@observer
export default class ArticleList extends BaseComponent {
    constructor(props) {
        super(props)
        this.initData({
            hasArticleLoaded: false
        })
    }

    onArticleLoaded = () => {
        if (!this.getData.hasArticleLoaded) {
            this.setData({
                hasArticleLoaded: true
            })
        }
    }

    render() {
        const { hasArticleLoaded } = this.data
        return (
            <div className='article-list'>
                <Loading style={{ position: 'absolute' }} hidden={hasArticleLoaded} />
                {
                    Articles.map((article, idx) =>
                        <ArticleItem key={idx} article={article} loaded={this.onArticleLoaded} />
                    )
                }
            </div>
        )
    }
}