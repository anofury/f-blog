import { Component } from 'react'
import { observer } from 'mobx-react'

@observer
export default class Test extends Component {
    constructor(props) {
        super(props)
    }

    swiperChangeHandle(current) {
        console.log('Test3 swiperChangeHandle', current)
    }

    swiperTransitionFinishHandle() {
        console.log('Test3 swiperTransitionFinishHandle')
    }

    render() {
        return (
            <div>this is a test page</div>
        )
    }
}