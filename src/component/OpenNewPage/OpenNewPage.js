import { observer, BaseComponent } from '../BaseComponent'
import ReactDOM from 'react-dom'
import BScroll from 'better-scroll'
import { cns, sleep } from '../../utils'

import './OpenNewPage.css'

@observer
class OpenNewPage extends BaseComponent {
    constructor(props) {
        super(props)
        this.initData({
            pageArray: []
        })
        this.pageContentBS = {}
    }


    show = PageOption => {
        let pageArrayTmp = this.getData.pageArray
        pageArrayTmp.push(PageOption)
        this.setData({ pageArray: pageArrayTmp, [`close_${pageArrayTmp.length - 1}`]: false }, () => {
            this.pageContentBS[`pageContent-${pageArrayTmp.length - 1}`] =
                new BScroll(this.refs[`pageContent-${pageArrayTmp.length - 1}`], {
                    click: true,
                    swipeBounceTime: 200,
                    eventPassthrough: 'horizontal',
                    bounceTime: 300,
                    probeType: 3
                })
        })


        let pushStateState = {
            title: PageOption.title, url: `#/page_note=${PageOption.note}`
        }
        window.history.pushState(pushStateState, pushStateState.title, pushStateState.url)
        window.addEventListener("popstate", this.close, false)
    }

    close = () => {
        if (this.getData.pageArray.length === 1)
            window.removeEventListener("popstate", this.close, false)
        this.setData({ [`close_${this.getData.pageArray.length - 1}`]: true }, () => {
            sleep(400).then(() => {
                let pageArrayTmp = this.getData.pageArray,
                    pageContentBS = this.pageContentBS[`pageContent-${pageArrayTmp.length - 1}`]

                pageArrayTmp.pop()
                this.setData({
                    pageArray: pageArrayTmp
                }, () => {
                    pageContentBS && pageContentBS.destroy()
                })
            })
        })
    }

    onDoubleTapPageHeader = () => {
        if (!this.pageHeaderFirstTap) this.pageHeaderFirstTap = new Date()
        else {
            if (new Date - this.pageHeaderFirstTap < 500) {
                let pageContentBS = this.pageContentBS[`pageContent-${this.getData.pageArray.length - 1}`]
                pageContentBS && pageContentBS.scrollTo(0, 0, 500)
            }
            delete this.pageHeaderFirstTap
        }
    }

    render() {
        const { pageArray } = this.data
        return (
            pageArray.map((pageItem, pageIndex) =>
                <div className={cns('page', { close: this.getData[`close_${pageIndex}`] })} id={`page-${pageIndex}`}>
                    <div className='page-header' ref='pageHead' onTouchStart={this.onDoubleTapPageHeader}>
                        <p>
                            <span className='header-back icon-back' onClick={() => { window.history.back() }}></span>
                            <span className='header-title'>{pageItem.title || '无标题'}</span>
                        </p>
                        <span className='header-note'>{pageItem.note || '无标题'}</span>
                    </div>
                    <div className='page-content' ref={`pageContent-${pageIndex}`}>
                        <div className='page-content-BS'>
                            <pageItem.component {...pageItem.props} />
                        </div>
                    </div>
                </div >
            )
        )
    }
}

export default ReactDOM.render(<OpenNewPage />, document.querySelector('#page'))