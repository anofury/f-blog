import BaseComponent from '../BaseComponent'
import { observer } from 'mobx-react'
import { cns } from '../../utils'

import './Loading.css'

@observer
export default class Loading extends BaseComponent {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className={cns('ano-loading', { hidden: this.props.hidden })} style={this.props.style}>
                <span></span>
                <span></span>
                <span></span>
            </div>
        )
    }
}