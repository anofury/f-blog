import BaseComponent from '../component/BaseComponent'
import { observer } from 'mobx-react'
import BlogHead from '../component/BlogHead/BlogHead'
import BlogBody from '../component/BlogBody/BlogBody'
import { ArchiveIitle, Articles } from 'setting'

import './archive.css'

@observer
export default class Archive extends BaseComponent {
    constructor(props) {
        super(props)
        this.archive = { withTag: { noTag: [] }, withCategory: { noCategory: [] } }
    }

    swiperChangeHandle(current) {
        // console.log('archive swiperChangeHandle', current)
    }

    componentWillMount() {
        Articles.forEach(articleItem => {
            articleItem.tags.forEach(tagItem => {
                if (this.archive.withTag[tagItem])
                    this.archive.withTag[tagItem].push(articleItem)
                else this.archive.withTag[tagItem] = [articleItem]
            })
            if (!articleItem.tags.length) {
                this.archive.withTag.noTag.push(articleItem)
            }

            articleItem.categories.forEach(categoryItem => {
                if (this.archive.withCategory[categoryItem])
                    this.archive.withCategory[categoryItem].push(articleItem)
                else this.archive.withCategory[categoryItem] = [articleItem]
            })
            if (!articleItem.categories.length) {
                this.archive.withCategory.noCategory.push(articleItem)
            }
        })
    }

    render() {
        return (
            <div className='blog-archive'>
                <BlogHead title={ArchiveIitle} />
                <BlogBody>
                    <div className></div>
                </BlogBody>
            </div>
        )
    }
}