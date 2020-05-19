import { observer, BaseComponent } from '../BaseComponent'
import { Alert } from '../Context'
import PropTypes from "prop-types"

import './ArticleAnchor.css'

@observer
export default class ArticleAnchor extends BaseComponent {
    constructor(props) {
        super(props)
    }

    static propTypes = {
        href: PropTypes.string.isRequired
    }

    static defaultProps = {
        href: '/'
    }


    onTapAnchor = () => {
        Alert.show({ text: this.props.href })
        // OpenNewPage.show({
        //     title: this.props.children[0].props.value,
        //     note: 'iframe',
        //     component: createReactClass({
        //         onTapHref: function () {
        //             clipTextToBoard(that.props.href).then(success => {
        //                 success && that.context.Dialog.toast({ text: '复制成功~' })
        //             })
        //         },
        //         render: function () {
        //             return <div className='iframe'>
        //                 <p>轻触复制下方链接</p>
        //                 <p onClick={this.onTapHref}>{that.props.href}</p>
        //                 <p>此处坑多 小方不敢轻易入</p>
        //             </div>
        //         }
        //     })
        // })
    }

    render() {
        const { href, children } = this.props
        return (
            <span data-href={href} onClick={this.onTapAnchor} className='markdown-anchor'>{children[0].props.value}</span>
        )
    }
}