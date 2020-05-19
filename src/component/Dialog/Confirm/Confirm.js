import { observer, BaseComponent } from '../../BaseComponent'
import ReactDOM from 'react-dom'
import { cns, clipTextToBoard, sleep } from '../../../utils'
import { ConfirmLeftBtn, ConfirmRightBtn } from 'setting'
import './Confirm.css'

@observer
class Confirm extends BaseComponent {
    constructor(props) {
        super(props)
        this.initData({
            mount: false,
            unMount: false
        })
        this.defaultConfig = {
            text: 'missing parameter[text].',
            leftBtn: ConfirmLeftBtn || '取消',
            rightBtn: ConfirmRightBtn || '确定',
            fade: 400
        }
        this.config = {}
    }

    show = (config = {}) => {
        this.beginTime = new Date()
        this.config = Object.assign({}, this.defaultConfig, config)
        this.setData({ mount: true, unMount: false })
        return new Promise((resolve, reject) => {
            this.clickResolve = resolve
        })
    }

    _close = () => {
        this.setData({ unMount: true })
        sleep(this.config.fade).then(() => {
            this.setData({ mount: false, unMount: false })
            this.config = this.defaultConfig
            delete this.beginTime
        })
    }

    _onTapBtn = (type) => {
        if (!this.beginTime || (new Date() - this.beginTime < 100)) return
        this._close()
        this.clickResolve(type)
    }

    render() {
        const { mount, unMount } = this.data
        const { text, leftBtn, rightBtn } = this.config
        return (
            mount &&
            <div className={cns('confirm-container', { close: unMount })}>
                <div className='confirm-wrapper'>
                    <p className='content' onClick={clipTextToBoard.bind(this, text)}>
                        <span>{text}</span>
                    </p>
                    <div className='btns tiny-line-top tiny-line-vertical'>
                        <button className='btn btn-cancel' onClick={this._onTapBtn.bind(this, false)}>{leftBtn}</button>
                        <button className='btn btn-ok' onClick={this._onTapBtn.bind(this, true)}>{rightBtn}</button>
                    </div>
                </div>
            </div>
        )
    }
}
let div = document.createElement('div')
div.setAttribute('id', 'confirm')
document.querySelector('#dialog').appendChild(div)
export default ReactDOM.render(<Confirm />, div)