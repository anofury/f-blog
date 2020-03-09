import { Component, createContext } from 'react'
import { observer } from 'mobx-react'
import ArticlePage from '../ArticlePage/ArticlePage'
import { Alert, Confirm, Toast } from '../Dialog/Dialog'

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
                },
                ArticlePage: ArticlePage.show
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