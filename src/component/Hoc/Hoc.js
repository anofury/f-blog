import { Component, createContext } from 'react'
import { observer } from '../BaseComponent'
import { Alert, Confirm, Toast } from '../Context'
const BlogContext = createContext({})

const HOC = WrappedComponent => {
    return observer(class HOCWrapper extends Component {
        constructor(props) {
            super(props)
            this.BlogContext = {
                Dialog: {
                    alert: Alert.show,
                    confirm: Confirm.show,
                    toast: Toast.show,
                    toastClose: Toast.close
                }
            }
        }

        render() {
            return (
                <BlogContext.Provider value={this.BlogContext}>
                    <WrappedComponent />
                </BlogContext.Provider>
            )
        }
    })
}

export {
    HOC, BlogContext
}