import BaseComponent from '../component/BaseComponent'
import { observer } from 'mobx-react'
import Swiper from '../component/Swiper/Swiper'
import HOC from '../component/Hoc/HOC'
import ReactDOM from 'react-dom'
import { sleep, cns } from '../utils'
import { TabList } from 'setting'
import './main.css'

import Index from '../index/index'
import Archive from './test2'
import About from './test3'

@observer
class Main extends BaseComponent {
    constructor(props) {
        super(props)
        this.initData({
            showPage: false,
            tabIndex: 0
        })
    }

    setTabId = tabIndex => {
        this.setData({ tabIndex })
        this.Swiper.moveToPosition(tabIndex)
    }

    componentWillMount() {
        console.log(this.props.Dialog)
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
                    <Swiper ref={e => { this.Swiper = e }} defaultPosition={this.getData.tabIndex} slideItem={[Index, Archive, About]} changeHandle={this.setTabId}></Swiper>
                </div>
                <div className='main-tabs'>{
                    TabList.map((tab, idx) =>
                        <div key={idx} className='tabs-item' onClick={this.setTabId.bind(this, idx)}>
                            <div className={cns('tab-box', { current: tabIndex === idx })}>
                                <p className={tab.className}></p>
                                <p>{tab.title}</p>
                            </div>
                        </div>
                    )
                }</div>
            </div>
        )
    }
}

const Blog = observer(HOC(Main))

ReactDOM.render(<Blog />, document.querySelector('#content'))