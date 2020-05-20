import { observer, BaseComponent } from '../component/BaseComponent'
import BlogHead from '../component/BlogHead/BlogHead'
import BlogBody from '../component/BlogBody/BlogBody'
import ArchiveBlock from './ArchiveBlock/ArchiveBlock'
import { ArchiveTitle, Articles } from 'setting'
import { zfill } from '../utils'

import './archive.css'

@observer
export default class Archive extends BaseComponent {
    constructor(props) {
        super(props)
        this.archive = {
            withTag: { 无标签: [] },
            withCategory: { 无分类: [] },
            withDate: {}
        }
    }

    componentWillMount() {
        Articles.forEach(articleItem => {
            articleItem.tags.forEach(tagItem => {
                if (this.archive.withTag[tagItem])
                    this.archive.withTag[tagItem].push(articleItem)
                else this.archive.withTag[tagItem] = [articleItem]
            })
            if (!articleItem.tags.length) {
                this.archive.withTag.无标签.push(articleItem)
            }

            articleItem.categories.forEach(categoryItem => {
                if (this.archive.withCategory[categoryItem])
                    this.archive.withCategory[categoryItem].push(articleItem)
                else this.archive.withCategory[categoryItem] = [articleItem]
            })
            if (!articleItem.categories.length) {
                this.archive.withCategory.无分类.push(articleItem)
            }

            let date = new Date(articleItem.date)
            let withDateKey = `${date.getFullYear()} 年 ${zfill(date.getMonth() + 1)} 月`
            if (this.archive.withDate[withDateKey])
                this.archive.withDate[withDateKey].push(articleItem)
            else this.archive.withDate[withDateKey] = [articleItem]
        })
    }

    render() {

        return (
            <div className='blog-archive'>
                <BlogHead title={ArchiveTitle} />
                <BlogBody>
                    <ArchiveBlock title='按日期' data={this.archive.withDate} />
                    <ArchiveBlock title='按分类' data={this.archive.withCategory} />
                    <ArchiveBlock title='按标签' data={this.archive.withTag} />
                </BlogBody>
            </div>
        )
    }
}