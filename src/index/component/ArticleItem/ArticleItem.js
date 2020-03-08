import BaseComponent from '../../../component/BaseComponent'
import { observer } from 'mobx-react'
import ReactMarkdown from 'react-markdown'
import CodeBlock from './CodeBlock'
import Image from '../../../component/Image/Image'
import { getArticle } from '../../../interface'
import { cns, dateFormat } from '../../../utils'
import { ArticleMore } from 'setting'

import './ArticleItem.css'

@observer
export default class ArticleItem extends BaseComponent {
    constructor(props) {
        super(props)
        this.initData({
            content: '',
            showMore: false
        })
        this.oriContent = ''
    }

    componentWillMount() {
        getArticle(this.props.article.path).then(content => {
            let morePosition = content.indexOf(ArticleMore)
            let hasMore = morePosition !== -1
            let newContent = hasMore ? content.slice(0, content.indexOf(ArticleMore)) : content

            this.props.loaded && this.props.loaded()
            this.oriContent = content
            this.setData({ content: newContent, showMore: hasMore })
        })
    }

    render() {
        const { content, showMore } = this.data
        const { article } = this.props
        return (
            <div className={cns('article-item', { show: !!content })}>
                <div className='article-header'>
                    <p className='title'>{article.title}</p>
                    <p>
                        <span className='date icon-date'>{`发表于 ${dateFormat(article.date, 'YYYY-MM-DD')}`}</span>
                        <span className='category icon-category'>
                            {`分类 ${article.categories.length ? article.categories.join('/') : '无'}`}
                        </span>
                    </p>
                </div>
                <ReactMarkdown
                    source={content} className='article-mark'
                    renderers={{ code: CodeBlock, image: Image }} escapeHtml={false}
                />
                {
                    showMore &&
                    <div className='article-more'>
                        <button>阅读全文 »</button>
                    </div>
                }
            </div>
        )
    }
}
