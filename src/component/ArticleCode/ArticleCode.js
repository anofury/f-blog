import { observer, BaseComponent } from '../BaseComponent'
import PropTypes from "prop-types"
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter"
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism"
import { jsx, javascript, css, sass, scss } from "react-syntax-highlighter/dist/esm/languages/prism"

@observer
export default class CodeBlock extends BaseComponent {
    constructor(props) {
        super(props)
    }

    static propTypes = {
        value: PropTypes.string.isRequired,
        language: PropTypes.string
    }

    static defaultProps = {
        language: 'javascript'
    }

    componentWillMount() {
        SyntaxHighlighter.registerLanguage("jsx", jsx)
        SyntaxHighlighter.registerLanguage("javascript", javascript)
        SyntaxHighlighter.registerLanguage("css", css)
        SyntaxHighlighter.registerLanguage("sass", sass)
        SyntaxHighlighter.registerLanguage("scss", scss)
    }

    render() {
        const { language, value } = this.props;
        return (
            <figure className="highlight">
                <SyntaxHighlighter language={language} style={atomDark}>
                    {value}
                </SyntaxHighlighter>
            </figure>
        )
    }
}