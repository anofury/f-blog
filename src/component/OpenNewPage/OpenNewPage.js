import BaseComponent from '../BaseComponent'
import ReactDOM from 'react-dom'
import { observer } from 'mobx-react'
import BScroll from 'better-scroll'
import { cns, sleep } from '../../utils'

import './OpenNewPage.css'

@observer
class OpenNewPage extends BaseComponent {
    constructor(props) {
        super(props)
        this.initData({
            show: false,
            close: false,
            showNote: false,
        })
        this.PageOption = {}
    }


    show = PageOption => {
        this.PageOption = PageOption
        this.setData({ show: true, close: false, showNote: false }, () => {
            if (!PageOption.nscroll) {
                this.pageContentBS = new BScroll(this.refs.pageContent, {
                    click: true,
                    eventPassthrough: 'horizontal',
                    bounceTime: 400,
                    probeType: 3
                })
                this.pageContentBS.on('scroll', pos => {
                    if (pos.y < -this.refs.pageHead.offsetHeight) {
                        this.setData({ showNote: true })
                    } else this.setData({ showNote: false })
                })
            }
        })
        let pushStateState = {
            title: PageOption.title, url: `#/page_note=${PageOption.note}`
        }
        window.history.pushState(pushStateState, pushStateState.title, pushStateState.url)
        window.addEventListener("popstate", this.close, false)
    }

    close = () => {
        window.removeEventListener("popstate", this.close, false)
        this.setData({ close: true }, () => {
            sleep(400).then(() => {
                this.setData({ show: false, close: false, showNote: false })
                this.pageContentBS && this.pageContentBS.destroy()
            })
        })
    }

    render() {
        const { show, close, showNote } = this.data
        const { PageOption } = this
        return (
            show &&
            <div className={cns('page', { close })} >
                <div className='page-header' ref='pageHead'>
                    <p>
                        <span className='header-back icon-back' onClick={() => { window.history.back() }}></span>
                        <span className='header-title'>{PageOption.title || ''}</span>
                    </p>
                    <span className={cns('header-note', { show: showNote })}>{PageOption.note || ''}</span>
                </div>
                {
                    PageOption.nscroll ?
                        <div className='page-content'>
                            <PageOption.component {...PageOption.props} />
                        </div>
                        : <div className='page-content' ref='pageContent'>
                            <div className='page-content-BS'>
                                <PageOption.component {...PageOption.props} />
                            </div>
                        </div>
                }
            </div>
        )
    }
}

export default ReactDOM.render(<OpenNewPage />, document.querySelector('#page'))