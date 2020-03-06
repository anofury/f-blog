import { Fragment, Component } from 'react'
import { observer } from 'mobx-react'
import { Alert, Confirm, Toast } from '../Dialog/Dialog'

const HOC = WrappedComponent => {
    return observer(class Index extends Component {
        constructor(props) {
            super(props)
        }

        dialogMethods() {
            return {
                alert: Alert.show,
                confirm: Confirm.show,
                toast: Toast.show,
                toastClose: Toast.close
            }
        }

        render() {
            return (
                <Fragment>
                    <WrappedComponent Dialog={this.dialogMethods()}></WrappedComponent>
                </Fragment>
            )
        }
    })
}

export default HOC