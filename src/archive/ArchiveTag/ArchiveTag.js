import { observer, BaseComponent } from '../../component/BaseComponent'
import OpenNewPage from '../../component/OpenNewPage/OpenNewPage'
import ArchiveBlockList from '../ArchiveBlockList/ArchiveBlockList'
import './ArchiveTag.css'
import { Toast } from '../../component/Context'
import { ArchiveTagBG } from 'setting'

@observer
export default class ArchiveTag extends BaseComponent {
    constructor(props) {
        super(props)
    }

    getRGBA = () => {
        let color = ArchiveTagBG[Math.floor(Math.random() * ArchiveTagBG.length)]
        let reg1 = /^#([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i
        let reg2 = /^#([0-9A-F])([0-9A-F])([0-9A-F])$/i
        let reg3 = /[0-9A-F]{2}/g, m

        if (reg2.test(color)) {
            color = color.replace(reg2, '#$1$1$2$2$3$3')
        } else if (reg1.test(color)) {
            m = color.match(reg3)
            color = 'rgb(' + [parseInt(m[0], 16), parseInt(m[1], 16), parseInt(m[2], 16), 0.4].join(',') + ')'
        }
        return color
    }

    onTapTagItem = () => {
        let articleInfo = this.props
        if (articleInfo.article && !articleInfo.article.length)
            Toast.show({ text: '这个栏目下没有文章哦.' })
        else
            OpenNewPage.show({
                title: articleInfo.from,
                note: articleInfo.title,
                component: ArchiveBlockList,
                props: {
                    article: articleInfo.article
                }
            })
    }

    render() {
        const { title, article } = this.props
        return (
            <span className='archive-item'
                style={{ backgroundColor: this.getRGBA() }}
                onClick={this.onTapTagItem}
            >
                <span>{title}</span>
                <span>{`×${article.length}`}</span>
            </span >
        )
    }
}