import { observer, BaseComponent } from '../component/BaseComponent'
import { Toast } from '../component/Context'
import { preLoadImg, cns, sleep } from '../utils'
import { OKFetch, fetchParam } from '../interface'
import { BGs } from 'setting'

import './box.css'

@observer
export default class Box extends BaseComponent {
    constructor(props) {
        super(props)
        this.timer = 0
        this.imgList = []
        this.config = {
            fadeInTime: 5,
            loopTime: 8,
            buttons: [
                {
                    title: '詞霸',
                    api: fetchParam.ciba
                },
                {
                    title: '壹个',
                    api: fetchParam.yige
                },
                {
                    title: '句讀',
                    api: fetchParam.judou
                },
                {
                    title: '壹言',
                    api: fetchParam.yiyan
                }
            ]
        }
    }

    clearTimer = () => {
        clearTimeout(this.timer)
    }

    swiperChangeHandle(current) {
        if (!current) {
            this.props.showTabs()
            this.clearTimer()
        } else {
            this.props.hideTabs()
            this.loadRandomImg(!this.imgList.length)
        }
    }

    getRandomImg = () => {
        let newSrc = BGs.dir + BGs.list[~~(Math.random() * BGs.length)]
        if (this.imgList.length && this.imgList[0].src.indexOf(newSrc) !== -1)
            return this.getRandomImg()
        else
            return newSrc
    }

    loadRandomImg = (init = false) => {
        const { fadeInTime, loopTime } = this.config
        this.clearTimer()
        this.timer = setTimeout(() => {
            preLoadImg(this.getRandomImg()).then(Img => {
                let boxImg = Img[0]
                boxImg.className = `box-img ${init ? 'init' : ''}`

                this.imgList.push(boxImg)
                this.refs.box.appendChild(boxImg)
                !init && this.showOath()

                setTimeout(() => {
                    if (this.imgList.length >= 2) {
                        this.refs.box.removeChild(this.imgList[0])
                        this.imgList.shift()
                        this.loadRandomImg()
                    }
                }, fadeInTime * 1000)
            })
        }, init ? 0 : (loopTime * 1000))
    }

    showOath = () => {
        OKFetch(fetchParam.oath).then(oath => {
            Toast.show({ text: oath.data.content, last: 5000 })
        })
    }

    componentWillMount() {
        this.loadRandomImg(true)
        window.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.clearTimer()
            } else {
                this.loadRandomImg(!this.imgList.length)
            }
        })
    }

    render() {
        return (
            <div className='blog-box' ref='box'>
                <div className='box-container'>
                    <div className='box-note'>waiting...</div>
                </div>
            </div>
        )
    }
}