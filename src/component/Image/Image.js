import { observer, BaseComponent } from '../BaseComponent'
import { preLoadImg, cns } from '../../utils'

import './Image.css'

@observer
export default class Image extends BaseComponent {
    constructor(props) {
        super(props)
        this.initData({
            show: false
        })
    }

    // Todo 图片点击全屏 手势放大 旋转

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