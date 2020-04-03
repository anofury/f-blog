import BaseComponent from '../../component/BaseComponent'
import { observer } from 'mobx-react'
import './ArchiveTag.css'

@observer
export default class ArchiveTag extends BaseComponent {
    constructor(props) {
        super(props)
    }

    getRGBA = () => {
        const colors = ["#F73859", "#14FFEC", "#00E0FF", "#FF99FE", "#478BA2", "#DE5B6D", "#E9765B", "#DA2864", "#16A5A3", "#33539E", "#C0392B"]
        let color = colors[Math.floor(Math.random() * colors.length)]
        let reg1 = /^#([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i
        let reg2 = /^#([0-9A-F])([0-9A-F])([0-9A-F])$/i
        let reg3 = /[0-9A-F]{2}/g, m

        if (reg2.test(color)) {
            color = color.replace(reg2, "#$1$1$2$2$3$3")
        } else if (reg1.test(color)) {
            m = color.match(reg3)
            color = "rgb(" + [parseInt(m[0], 16), parseInt(m[1], 16), parseInt(m[2], 16), 0.4].join(',') + ")"
        }
        return color
    }

    onTapTagItem = () => {
        console.log(this.props)
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