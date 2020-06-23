import { observer, BaseComponent } from '../BaseComponent'
import Image from '../Image/Image'
import { cns } from '../../utils'

import './BlogHead.css'
import Toast from '../Dialog/Toast/Toast'

@observer
export default class BlogHead extends BaseComponent {
    constructor(props) {
        super(props)
    }

    onTapBlogHead = () => {
    }

    onTapAvatar = () => {
        this.props.avatarClick && this.props.avatarClick()
    }

    render() {
        const { src, title, slogan } = this.props
        return (
            <div className={cns('blog-head', { onlyTitle: !src && !slogan })} onClick={this.onTapBlogHead}>
                {
                    src && <div className='head-user' onClick={this.onTapAvatar}>
                        <Image src={src} />
                    </div>
                }
                <div className='head-title'>{title || 'Title'}</div>
                {
                    slogan && <div className='head-slogan' dangerouslySetInnerHTML={{ __html: slogan.replace('\n', '<br/>') }} />
                }
            </div>
        )
    }
}