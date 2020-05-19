import { observer, BaseComponent } from '../../BaseComponent'
import ReactDOM from 'react-dom'
import { cns, clipTextToBoard, isType, sleep } from '../../../utils'
import { AlertBtn } from 'setting'
import './Alert.css'

@observer
class Alert extends BaseComponent {
    constructor(props) {
        super(props)
        this.initData({
            mount: false,
            unMount: false
        })
        this.defaultConfig = {
            text: ['missing parameter[text].'],
            btn: AlertBtn || '我知道了',
            fade: 400
        }
        this.config = {}
    }

    show = (config = {}) => {
        this.beginTime = new Date()
        if (config.text && !isType(config.text, 'array'))
            config.text = [config.text]
        this.config = Object.assign({}, this.defaultConfig, config)
        this.setData({ mount: true, unMount: false })
        return new Promise((resolve, reject) => {
            this.unMountResolve = resolve
        })
    }

    _close = () => {
        if (!this.beginTime || (new Date() - this.beginTime < 100)) return
        this.setData({ unMount: true })
        sleep(this.config.fade).then(() => {
            this.setData({ mount: false, unMount: false })
            this.config = this.defaultConfig
        })
        this.unMountResolve && this.unMountResolve()
    }

    render() {
        const { mount, unMount } = this.data
        const { text, btn } = this.config
        return (
            mount &&
            <div className={cns('alert-container', { close: unMount })}>
                <div className='alert-wrapper'>{
                    text.map((oneText, index) =>
                        <p key={`ciba-alert${index}`} className='content tiny-line-bottom' onClick={clipTextToBoard.bind(this, oneText.content || oneText)}>
                            <span style={{ fontSize: oneText.size || '' }}>{oneText.content || oneText}</span>
                        </p>
                    )
                }
                    <button className='btn' onClick={this._close}>{btn}</button>
                </div>
            </div>
        )
    }
}
let div = document.createElement('div')
div.setAttribute('id', 'alert')
document.querySelector('#dialog').appendChild(div)
export default ReactDOM.render(<Alert />, div)