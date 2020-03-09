import BaseComponent from '../BaseComponent'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import ReactMarkdown from 'react-markdown'
import CodeBlock from './CodeBlock'
import Image from '../Image/Image'
import { getArticle } from '../../interface'
import { cns, dateFormat, deepCopy } from '../../utils'
import { ArticleMore } from 'setting'

import './ArticleBlock.css'

@observer
export default class ArticleBlock extends BaseComponent {
    constructor(props) {
        super(props)
        this.initData({
            content: '',
            showMore: false
        })
        this.oriContent = ''
    }

    static propTypes = {
        article: PropTypes.object.isRequired
    }

    onTapReadMore = () => {
        const { article, articlePageHandle } = this.props
        let articleInfo = Object.assign({}, deepCopy(article), {
            content: this.oriContent
        })
        articlePageHandle && articlePageHandle(articleInfo)
    }

    loadArticleContent = content => {
        let morePosition = content.indexOf(ArticleMore)
        let hasMoreFlag = morePosition !== -1
        let newContent = content, showMore = false

        if (this.props.showAll && hasMoreFlag) {
            newContent = content.slice(0, morePosition) + content.slice(morePosition + ArticleMore.length)
        }
        if (!this.props.showAll && hasMoreFlag) {
            newContent = content.slice(0, morePosition)
            showMore = true
        }
        this.props.loaded && this.props.loaded()
        this.oriContent = content
        this.setData({ content: newContent, showMore })
    }

    componentWillMount() {
        if (this.props.article) {
            const articleInfo = this.props.article
            if (articleInfo.content) {
                this.loadArticleContent(articleInfo.content)
            } else {
                getArticle(articleInfo.path).then(content => {
                    this.loadArticleContent(content)
                })
            }
        }
    }

    render() {
        const { content, showMore } = this.data
        const { article } = this.props
        return (
            <div className={cns('article-block', { show: !!content })}>
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
                        <button onClick={this.onTapReadMore}>阅读全文 »</button>
                    </div>
                }
            </div>
        )
    }
}
