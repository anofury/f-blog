import { Component, createContext } from 'react'
import { observer } from 'mobx-react'
import { Alert, Confirm, Toast } from '../Dialog/Dialog'

const DialogContext = createContext({})

const HOC = WrappedComponent => {
    return observer(class HOCWrapper extends Component {
        constructor(props) {
            super(props)
            this.DialogContext = {
                alert: Alert.show,
                confirm: Confirm.show,
                toast: Toast.show,
                toastClose: Toast.close
            }
        }

        render() {
            return (
                <DialogContext.Provider value={this.DialogContext}>
                    <WrappedComponent />
                </DialogContext.Provider>
            )
        }
    })
}

export {
    HOC, DialogContext
}