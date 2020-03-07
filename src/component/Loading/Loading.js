import BaseComponent from '../BaseComponent'
import { observer } from 'mobx-react'

import './Loading.css'

@observer
export default class Loading extends BaseComponent {
    constructor(props) {
        super(props)
    }

    render() {
        console.log('loading')
        return (
            <div className='ano-loading'>
                loading
            </div>
        )
    }
}