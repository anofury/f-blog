import { observer, BaseComponent } from '../component/BaseComponent'
import { preLoadImg, cns, sleep } from '../utils'
import { BGs } from 'setting'

import './box.css'

@observer
export default class Box extends BaseComponent {
    constructor(props) {
        super(props)
        this.initData({
            loopCountDown: 0
        })
        this.timer = 0
        this.imgList = []
        this.config = {
            fadeInTime: 5,
            loopTime: 10
        }
    }

    clearTimer = () => {
        clearTimeout(this.timer)
        clearInterval(this.countDownTimer)
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

    countDown = () => {
        this.setData({ loopCountDown: this.config.loopTime })
        this.countDownTimer = setInterval(() => {
            const loopCountDown = this.getData.loopCountDown
            this.setData({ loopCountDown: loopCountDown - 1 })
            this.getData.loopCountDown <= 0 && clearInterval(this.countDownTimer)
        }, 1000)
    }

    getRandomImg = () => {
        let newSrc = BGs.dir + BGs.list[~~(Math.random() * BGs.length)]
        if (newSrc === this.getData.currentSrc)
            return this.getRandomImg()
        else
            return newSrc
    }

    loadRandomImg = (init = false) => {
        const { fadeInTime, loopTime } = this.config
        this.clearTimer()
        this.countDown()
        this.timer = setTimeout(() => {
            preLoadImg(this.getRandomImg()).then(Img => {
                let boxImg = Img[0]
                boxImg.className = `box-img ${init ? 'init' : ''}`

                this.imgList.push(boxImg)
                this.refs.box.appendChild(boxImg)

                setTimeout(() => {
                    if (this.imgList.length >= 2) {
                        this.refs.box.removeChild(this.imgList[0])
                        this.imgList.shift()
                    }
                    this.loadRandomImg()
                }, fadeInTime * 1000)
            })
        }, init ? 0 : loopTime * 1000)
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
        const { loopCountDown } = this.data
        return (
            <div className='blog-box' ref='box'>
                <span className='box-countdown'>{loopCountDown}</span>
            </div>
        )
    }
}