import { Component } from 'react'
import { observer } from 'mobx-react'

@observer
export default class Test extends Component {
    constructor(props) {
        super(props)
    }

    swiperChangeHandle(current) {
        console.log('Test2 swiperChangeHandle', current)
    }

    swiperTransitionFinishHandle() {
        console.log('Test2 swiperTransitionFinishHandle')
    }

    render() {
        return (
            <div>this is a test page</div>
        )
    }
}