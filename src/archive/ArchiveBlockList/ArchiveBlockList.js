import BaseComponent from '../../component/BaseComponent'
import { observer } from 'mobx-react'
import OpenNewPage from '../../component/OpenNewPage/OpenNewPage'
import ArticleBlock from '../../component/ArticleBlock/ArticleBlock'
import './ArchiveBlockList.css'

@observer
export default class ArchiveBlockList extends BaseComponent {
    constructor(props) {
        super(props)
    }

    onTapArchiveArticleItem = articleItemIdx => {
        const articleInfo = this.props.article[articleItemIdx]
        OpenNewPage.show({
            title: '文章详细',
            note: articleInfo.title,
            component: ArticleBlock,
            props: {
                article: articleInfo,
                showAll: true,
                delay: true
            }
        })
    }

    render() {
        const { article } = this.props
        return (
            <ul className='archive-article-list'>{
                article.map((articleItem, idx) =>
                    <li key={idx} className='archive-article-item' onClick={this.onTapArchiveArticleItem.bind(this, idx)}>
                        <p className='archive-article-item-td'>
                            <span>{articleItem.title}</span>
                            <span>{articleItem.date}</span>
                        </p>
                        <p className='archive-article-item-ds'>{articleItem.description}</p>
                    </li>
                )
            }</ul>
        )
    }
}