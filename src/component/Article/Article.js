import BaseComponent from '../BaseComponent'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import ReactMarkdown from 'react-markdown'
import Image from '../Image/Image'
import Anchor from '../Anchor/Anchor'
import CodeBlock from '../CodeBlock/CodeBlock'
import OpenNewPage from '../OpenNewPage/OpenNewPage'
import { BlogContext } from '../Hoc/Hoc'
import { getArticle } from '../../interface'
import { cns, dateFormat, deepCopy } from '../../utils'
import { ArticleMore } from 'setting'

import './Article.css'

@observer
export default class Article extends BaseComponent {
    constructor(props) {
        super(props)
        this.initData({
            content: '',
            showMore: false
        })
        this.oriContent = ''
    }

    static contextType = BlogContext

    static propTypes = {
        article: PropTypes.object.isRequired
    }

    onTapReadMore = () => {
        let articleInfo = Object.assign({}, deepCopy(this.props.article), {
            content: this.oriContent
        })
        OpenNewPage.show({
            title: '文章详细',
            note: articleInfo.title,
            component: Article,
            props: {
                article: articleInfo,
                showAll: true
            }
        })
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
                    renderers={{ code: CodeBlock, image: Image, link: Anchor }} escapeHtml={false}
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
