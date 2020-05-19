import { observer, BaseComponent } from '../BaseComponent'
import Image from '../Image/Image'
import { cns } from '../../utils'

import './BlogHead.css'

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

    render() {
        const { src, title, slogan } = this.props
        return (
            <div className={cns('blog-head', { onlyTitle: !src && !slogan })} onClick={this.onTapBlogHead}>
                {
                    src && <div className='head-user'>
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