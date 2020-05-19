import { observer, BaseComponent } from '../component/BaseComponent'
import Swiper from '../swiper/swiper'
import { HOC } from '../component/Hoc/Hoc'
import ReactDOM from 'react-dom'

import Index from '../index/index'
import Archive from '../archive/archive'
import About from '../about/about'

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
            tabIndex: getUrlSearchParam('tab')
        })
    }

    setTabId = tabIndex => {
        this.setData({ tabIndex })
        this.Swiper.moveToPosition(tabIndex)
    }

    componentDidMount() {
        sleep(0).then(() => {
            this.setData({ showPage: true }, window.pageShow)
        })
    }

    render() {
        const { showPage, tabIndex } = this.data
        return (
            <div className={cns('main-blog', { show: showPage })}>
                <div className='main-body'>
                    <Swiper ref={e => { this.Swiper = e }} defaultPosition={this.getData.tabIndex}
                        slideItem={[Index, Archive, About]} changeHandle={this.setTabId}
                    />
                </div>
                <div className='main-tabs'>{
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