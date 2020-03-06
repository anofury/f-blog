import BaseComponent from '../BaseComponent'
import { observer } from 'mobx-react'
import { isType, cns } from '../../utils'
import './Swiper.css'

@observer
export default class Swiper extends BaseComponent {
    constructor(props) {
        super(props)
        this.initData({
            scrollX: 0
        })
        this.moveTimer = 0
        this.nowPosition = 0
        this.newPosition = 0
        this.moveStatus = {
            state: false,
            speed: .25
        }

        // 传递给子组件调用的方法列表
        this.swiperPropsFuns = ['activeSwiper', 'pauseSwiper', 'moveToPosition']
        this.swiperPropertyNames = {
            swiperItemAmount: this.props.slideItem.length,
            swiperPropsFuns: this.swiperPropsFuns,
            ...this.swiperPropsFuns.reduce((total, funcName) =>
                Object.assign(total, {
                    [funcName]: this[funcName]
                }), {}
            )
        }
    }

    static defaultProps = {
        config: {
            // 滑动距离小于 lockPixel 则不触发滑动
            lockPixel: 15,
            // 0.2px/ms 快速滑动触发切换时的手指滑动最小速度
            flickSpeed: .4,
            // 左右滑动至边缘时的弹性滑动距离
            elasticPixel: window.innerWidth * .3,
        },
        // 默认位置
        defaultPosition: 0,
        slideItem: [],
        changeHandle: null
    }

    _checkPosition = position => {
        let checkedResult = 0
        switch (position) {
            case 'first':
                checkedResult = 0
                break
            case 'last':
                checkedResult = this.config.length - 1
                break
            case 'middle':
                checkedResult = Math.floor((this.config.length - 1) / 2)
                break
            default:
                if (isNaN(+position) || +position < 0) checkedResult = 0
                else if (+position > this.config.length - 1) checkedResult = this.config.length - 1
                else checkedResult = +position
                break
        }
        return checkedResult
    }

    _touchStart = e => {
        const point = e.touches[0]
        this.startStatus = {
            scrollX: this.getData.scrollX || 0,
            clientX: point.clientX,
            clientY: point.clientY,
            time: new Date()
        }
        this.moveStatus.state = false
        if (!e.target.getAttribute('cancel')) {
            this._activeSlider()
        }
        cancelAnimationFrame(this.moveTimer)
    }

    _touchMove = e => {
        const point = e.touches[0]
        const scrollPixel = point.clientX - this.startStatus.clientX
        const y = point.clientY - this.startStatus.clientY

        // 如果垂直滑动占优势，则不监听水平滑动
        if (Math.abs(y) >= Math.abs(scrollPixel) && !this.moveStatus.state) {
            this._pauseSlider()
            return
        }

        // 滑动距离超过了锁定距离
        if (Math.abs(scrollPixel) >= this.config.lockPixel) {
            let newScrollX = this.startStatus.scrollX - (point.clientX - (this.startStatus.clientX + (scrollPixel > 0 ? 1 : -1) * this.config.lockPixel))

            // 设置水平边界滑动阻尼效果
            if (newScrollX < 0) {
                newScrollX = 2 / Math.PI * Math.atan(newScrollX / this.config.elasticPixel) * this.config.elasticPixel
            }
            if (newScrollX > this.config.limit) {
                newScrollX = this.config.limit + 2 / Math.PI * Math.atan((newScrollX - this.config.limit) / this.config.elasticPixel) * this.config.elasticPixel
            }
            this.moveStatus.state = true
            this.setData({ scrollX: newScrollX })
        }
    }

    _touchEnd = e => {
        const scrollPixel = this.getData.scrollX - this.startStatus.scrollX
        const scrollDuration = new Date() - this.startStatus.time
        const scrollSpeed = Math.abs(scrollPixel / scrollDuration)

        // 如果滑动距离达到切换距离 或 滑动速度达到切换最小速度 则 进行切换
        if (Math.abs(scrollPixel) >= this.config.width * .5 || scrollSpeed >= this.config.flickSpeed) {
            let nowPosition = this.nowPosition
            let newPosition = this._checkPosition(scrollPixel > 0 ? ++nowPosition : --nowPosition)
            this._moveTo(newPosition)
        }
        else this._moveTo(this.nowPosition)
    }

    _moveTo = targetPosition => {
        let isChange = false
        let targetX = targetPosition * this.config.width,
            direction = targetX - this.getData.scrollX >= 0 ? 1 : -1,
            dpr = window.devicePixelRatio || 1

        if (targetPosition !== this.nowPosition) {
            this.swiperChangeHandle(targetPosition)
            this.newPosition = targetPosition
            this.nowPosition = targetPosition
            this.props.changeHandle && this.props.changeHandle(targetPosition)
            isChange = true
        }

        let scrollFunc = () => {
            let step = (targetX - this.getData.scrollX) * this.moveStatus.speed
            this.setData({ scrollX: this.getData.scrollX + step })

            if ((direction >= 0 && this.getData.scrollX >= targetX - 1 / dpr) || (direction <= 0 && this.getData.scrollX <= targetX + 1 / dpr)) {
                this.setData({ scrollX: targetX })
                if (isChange) this.swiperTransitionFinishHandle()
            }
            else {
                cancelAnimationFrame(this.moveTimer)
                this.moveTimer = requestAnimationFrame(scrollFunc)
            }
        }
        cancelAnimationFrame(this.moveTimer)
        this.moveTimer = requestAnimationFrame(scrollFunc)
        this._pauseSlider()
    }

    _activeSlider = () => {
        const { controler } = this.refs
        controler.addEventListener('touchmove', this._touchMove, { capture: false, passive: true });
        ['touchend', 'touchcancel'].forEach(eventName => {
            controler.addEventListener(eventName, this._touchEnd, { capture: false, passive: true })
        });
    }

    _pauseSlider = () => {
        const { controler } = this.refs
        controler.removeEventListener('touchmove', this._touchMove, { capture: false, passive: true });
        ['touchend', 'touchcancel'].forEach(eventName => {
            controler.removeEventListener(eventName, this._touchEnd, { capture: false, passive: true })
        });
    }

    _initSwiperChangeHandle = () => {
        let nowItem = this.refs[`slideItem${this.nowPosition}`]
        nowItem && nowItem.swiperChangeHandle && nowItem.swiperChangeHandle(true)
    }

    // 传递给子组件 - 判断卡片切换时刻触发
    swiperChangeHandle = targetPosition => {
        let nowItem = this.refs[`slideItem${this.nowPosition}`]
        let newItem = this.refs[`slideItem${targetPosition}`]
        nowItem && nowItem.swiperChangeHandle && nowItem.swiperChangeHandle(false)
        newItem && newItem.swiperChangeHandle && newItem.swiperChangeHandle(true)
    }

    // 传递给子组件 - 卡片切换动画结束后触发事件
    swiperTransitionFinishHandle = () => {
        let newItem = this.refs[`slideItem${this.newPosition}`]
        newItem && newItem.swiperTransitionFinishHandle && newItem.swiperTransitionFinishHandle()
    }

    // 传递给子组件 - 激活 swiper 功能
    activeSwiper = () => {
        this.refs.controler.addEventListener('touchstart', this._touchStart, { capture: false, passive: true });
    }

    // 传递给子组件 - 暂停 swiper 功能
    pauseSwiper = () => {
        this.refs.controler.removeEventListener('touchstart', this._touchStart, { capture: false, passive: true });
    }

    // 传递给子组件 - 切换 swiper 位置
    moveToPosition = targetPosition => {
        let checkedResult = this._checkPosition(targetPosition)
        if (checkedResult !== this.nowPosition)
            this._moveTo(checkedResult)
    }

    componentDidMount() {
        const { target } = this.refs
        const { config, defaultPosition, slideItem } = this.props

        if (isType(slideItem, 'array') && slideItem.length) {
            this.config = {
                // 每个滑动卡片的宽度
                width: target.offsetWidth,
                // 卡片数量
                length: slideItem.length,
                // 滑动区域的最大宽度
                limit: (slideItem.length - 1) * target.offsetWidth,
                // 滑动距离小于 lockPixel 则不触发滑动
                lockPixel: config.lockPixel,
                // 0.2px/ms 快速滑动触发切换时的手指滑动最小速度
                flickSpeed: config.flickSpeed,
                // 左右滑动至边缘时的弹性滑动距离
                elasticPixel: config.elasticPixel
            }
            this.nowPosition = this.newPosition = this._checkPosition(defaultPosition)
            this.setData({
                scrollX: this.nowPosition * this.config.width
            })
            this._initSwiperChangeHandle()
            this.activeSwiper()
        }
    }

    render() {
        const { scrollX } = this.data
        const { slideItem } = this.props
        return (
            <div className='swiper-container' ref='controler'>
                <ul className='swiper-wrapper' ref='target' style={{ transform: `translate3d(${-scrollX}px,0,0)` }}>{
                    slideItem.map((Component, index) =>
                        <li key={`item${index}`} className={cns('slide-item', { current: this.nowPosition === index })}>
                            <Component
                                ref={`slideItem${index}`}
                                {...this.swiperPropertyNames}
                            />
                        </li>
                    )
                }</ul>
            </div>
        )
    }
}