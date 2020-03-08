import BaseComponent from '../BaseComponent'
import { observer } from 'mobx-react'
import { preLoadImg, cns, sleep } from '../../utils'

import './Image.css'

@observer
export default class Image extends BaseComponent {
    constructor(props) {
        super(props)
        this.initData({
            show: false
        })
    }

    componentDidMount() {
        preLoadImg(this.props.src).then(Img => {
            let loadedImg = Img[0]
            loadedImg.className = 'lazy-img'
            this.refs.img.appendChild(loadedImg)
            sleep(50).then(() => {
                this.setData({ show: true })
            })
        }).catch(err => {
            console.error(this.props.src, err)
        })
    }

    render() {
        const { show } = this.data
        return (
            <div ref='img' className={cns('', { lazyLoaded: show })}></div>
        )
    }
} 