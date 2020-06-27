import { observer, BaseComponent } from '../component/BaseComponent'
import Swiper from '../swiper/swiper'
import { HOC } from '../component/Hoc/Hoc'
import ReactDOM from 'react-dom'

import Index from '../index/index'
import Archive from '../archive/archive'
import About from '../about/about'
import Box from '../box/box'

import { sleep, cns, getUrlSearchParam } from '../utils'
import { TabList } from 'setting'
import './main.css'

@HOC
@observer
class Main extends BaseComponent {
    constructor(props) {
        super(props)
        this.initData({
            showPage: false,
            showTabs: false,
            tabIndex: getUrlSearchParam('tab')
        })
    }

    setTabId = tabIndex => {
        this.setData({ tabIndex })
        this.Swiper.moveToPosition(tabIndex)
    }

    hideTabs = () => {
        this.setData({ showTabs: false })
    }

    showTabs = () => {
        this.setData({ showTabs: true })
    }

    componentDidMount() {
        sleep(0).then(() => {
            this.showTabs()
            this.setData({ showPage: true }, window.pageShow)
        })
    }

    render() {
        const { showPage, showTabs, tabIndex } = this.data
        return (
            <div className={cns('main-blog', { show: showPage })}>
                <div className='main-body'>
                    <Swiper ref={e => { this.Swiper = e }} defaultPosition={this.getData.tabIndex}
                        slideItem={[Index, Archive, Box, About]} changeHandle={this.setTabId}
                        hideTabs={this.hideTabs} showTabs={this.showTabs}
                    />
                </div>
                <div className={cns('main-tabs', { hide: !showTabs })}>{
                    TabList.map((tab, idx) =>
                        <div key={idx} className='tabs-item' onClick={this.setTabId.bind(this, idx)}>
                            <div className={cns('tab-box', { current: tabIndex === idx })}>
                                <p className={tab.icon}></p>
                                <p>{tab.title}</p>
                            </div>
                        </div>
                    )
                }</div>
            </div>
        )
    }
}

// const Blog = observer(HOC(Main))

ReactDOM.render(<Main />, document.querySelector('#content'))