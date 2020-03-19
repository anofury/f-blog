import BaseComponent from '../BaseComponent'
import { observer } from 'mobx-react'
import BScroll from 'better-scroll'

import './BlogBody.css'

@observer
export default class BlogBody extends BaseComponent {
    constructor(props) {
        super(props)
        this.BlogBodyId = `blogBody${new Date().getTime()}`
    }

    componentDidMount() {
        this.blogBodyBS = new BScroll(this.refs[this.BlogBodyId], {
            click: true,
            swipeBounceTime: 200,
            eventPassthrough: 'horizontal',
            bounceTime: 400,
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