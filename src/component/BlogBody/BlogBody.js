import { observer, BaseComponent } from '../BaseComponent'
import BScroll from 'better-scroll'

import './BlogBody.css'

@observer
export default class BlogBody extends BaseComponent {
    constructor(props) {
        super(props)
        this.BlogBodyId = `blogBody-${Math.floor(Math.random() * 100000)}`
    }

    swiperChangeHandle(current) {
        !current && this.blogBodyBS.stop()
    }

    componentDidMount() {
        this.blogBodyBS = new BScroll(this.refs[this.BlogBodyId], {
            click: true,
            swipeBounceTime: 200,
            eventPassthrough: 'horizontal',
            bounceTime: 300,
            // bounce: false
        })
    }

    render() {
        return (
            <div className='blog-body' ref={this.BlogBodyId} id={this.BlogBodyId}>
                <div className='blog-body-BS'>
                    {this.props.children}
                </div>
            </div>
        )
    }
}