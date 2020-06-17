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
        // if (!this.blogHeaderFirstTap) this.blogHeaderFirstTap = new Date()
        // else {
        //     if (new Date - this.blogHeaderFirstTap < 500)
        //         this.pageContentBS && this.pageContentBS.scrollTo(0, 0, 500)
        //     delete this.blogHeaderFirstTap
        // }
    }

    onTapAvatar = () => {
        this.props.avatarClick && this.props.avatarClick('last')
        Toast.show({ text: '哎呀呀呀~' })
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