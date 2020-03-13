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

            let intersectionObserver = new IntersectionObserver(entries => {
                if (entries[0].intersectionRatio > 0) {
                    this.setData({ show: true })
                }
            })
            intersectionObserver.observe(loadedImg)
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