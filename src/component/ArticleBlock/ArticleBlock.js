import { Fragment } from 'react'
import { observer, BaseComponent } from '../BaseComponent'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'
import Image from '../Image/Image'
import Loading from '../Loading/Loading'
import ArticleAnchor from '../ArticleAnchor/ArticleAnchor'
import ArticleCode from '../ArticleCode/ArticleCode'
import OpenNewPage from '../OpenNewPage/OpenNewPage'
import { Toast } from '../Context'
import { BlogContext } from '../Hoc/Hoc'
import { getArticle } from '../../interface'
import { cns, dateFormat, deepCopy, sleep } from '../../utils'
import { ArticleMore, NetError } from 'setting'

import './ArticleBlock.css'

@observer
export default class ArticleBlock extends BaseComponent {
    constructor(props) {
        super(props)
        this.initData({
            content: '',
            error: false,
            showMore: false,
            clickMore: false,
        })
        this.oriContent = ''
    }

    static contextType = BlogContext

    static propTypes = {
        article: PropTypes.object.isRequired
    }

    onTapReadMore = () => {
        this.setData({ clickMore: true })
        sleep(800).then(() => {
            this.setData({ clickMore: false })
        })
        let articleInfo = Object.assign({}, deepCopy(this.props.article), {
            content: this.oriContent
        })
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

        if (this.props.delay)
            sleep(800).then(() => {
                this.setData({ content: newContent, showMore })
            })
        else this.setData({ content: newContent, showMore })
    }

    componentWillMount() {
        if (this.props.article) {
            const articleInfo = this.props.article
            if (articleInfo.content) {
                this.loadArticleContent(articleInfo.content)
            } else {
                getArticle(articleInfo.path).then(content => {
                    this.loadArticleContent(content)
                }).catch(err => {
                    this.setData({ error: true })
                    this.props.error && this.props.error(articleInfo)
                    Toast.show({ text: NetError })
                })
            }
        }
    }

    render() {
        const { content, error, clickMore, showMore } = this.data
        const { article, delay } = this.props
        return (
            !error && <Fragment>
                {delay && !content && <Loading />}
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
                        renderers={{ code: ArticleCode, image: Image, link: ArticleAnchor }} escapeHtml={false}
                    />
                    {
                        showMore &&
                        <div className='article-more'>
                            <span onClick={this.onTapReadMore} className={cns('', { active: clickMore })}>阅读全文 »</span>
                        </div>
                    }
                </div>
            </Fragment>
        )
    }
}
