import BaseComponent from '../../component/BaseComponent'
import { observer } from 'mobx-react'
import Loading from '../../component/Loading/Loading'
import ArticleBlock from '../../component/ArticleBlock/ArticleBlock'
import { Articles } from 'setting'

import './ArticleList.css'

import { BlogContext } from '../../component/Hoc/Hoc'

@observer
export default class ArticleList extends BaseComponent {
    constructor(props) {
        super(props)
        this.initData({
            hasArticleLoaded: false
        })
    }

    static contextType = BlogContext

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
                        <ArticleBlock key={idx} article={article} showAll={false}
                            loaded={this.onArticleLoaded} articlePageHandle={this.context.ArticlePage}
                        />
                    )
                }
            </div>
        )
    }
}