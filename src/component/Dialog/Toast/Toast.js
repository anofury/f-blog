import { observer, BaseComponent } from '../../BaseComponent'
import ReactDOM from 'react-dom'
import { cns, isType } from '../../../utils'
import './Toast.css'

@observer
class Toast extends BaseComponent {
    constructor(props) {
        super(props)
        this.initData({
            mount: false,
            unMount: false
        })
        this.config = {
            text: ['missing parameter[text].'],
            last: 3000,
            fade: 500
        }
    }

    show = (config = {}) => {
        clearTimeout(this.mountTimer)
        clearTimeout(this.unMountTimer)
        clearTimeout(this.lastTimer)
        clearTimeout(this.countTimer)

        if (config.text && !isType(config.text, 'array'))
            config.text = [config.text]

        this.config = Object.assign({}, this.config, config)
        this.setData({ mount: false, unMount: false })

        this.lastTimer = setTimeout(() => {
            this.close()
        }, this.config.last)

        this.mountTimer = setTimeout(() => {
            this.setData({ mount: true })
        }, 10)

        this.countTimer = setTimeout(() => {
            this.config.text.shift()
            if (this.config.text.length)
                this.show()
            else
                clearTimeout(this.countTimer)
        }, this.config.last + 10)
    }

    close = () => {
        this.setData({ unMount: true })
        this.unMountTimer = setTimeout(() => {
            this.setData({ mount: false, unMount: false })
        }, this.config.fade)
    }

    render() {
        const { mount, unMount } = this.data
        return (
            mount &&
            <div className={cns('toast-container', { close: unMount })}>
                <div className='toast-wrapper'>
                    <p className='text'>{this.config.text[0]}</p>
                </div>
            </div>
        )
    }
}
let div = document.createElement('div')
div.setAttribute('id', 'toast')
document.querySelector('#dialog').appendChild(div)
export default ReactDOM.render(<Toast />, div)