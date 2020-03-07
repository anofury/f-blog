import { lazy, Suspense } from 'react'
import BaseComponent from '../component/BaseComponent'
import ReactMarkdown from 'react-markdown'
import { observer } from 'mobx-react'
import Loading from '../component/Loading/Loading'
import { DialogContext } from '../component/Hoc/HOC'
import { getArticle } from '../interface'
import { Articles } from 'setting'

import './index.css'

@observer
export default class Index extends BaseComponent {
    constructor(props) {
        super(props)
        this.initData({
            articles: ''
        })
    }

    static contextType = DialogContext

    swiperChangeHandle(current) {
        console.log('index swiperChangeHandle', current)
        // console.log(this.context)
        let src = Articles[0].path

        getArticle(src).then(text => {
            this.setData({ articles: text })
        })
    }

    render() {
        const { articles } = this.data
        return (
            <div className='ano-index'>
                <ReactMarkdown source={articles} className='article' escapeHtml={false} />
            </div>
        )
    }
}