import BaseComponent from '../BaseComponent'
import { observer } from 'mobx-react'
import { preLoadImg, cns } from '../../utils'

import './Image.css'

@observer
export default class Image extends BaseComponent {
    constructor(props) {
        super(props)
        this.initData({
            src: '',
            show: false
        })
    }

    componentDidMount() {
        preLoadImg(this.props.src).then(() => {
            this.setData({
                src: this.props.src,
                show: true
            })
        }).catch(err => {
            console.error(this.props.src, err)
        })
    }

    render() {
        const { show, src } = this.data
        return (
            <img src={src} className={cns('lazy-img', { show: show })} />
        )
    }
} 