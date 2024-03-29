module.exports = {
    presets: [
        "@babel/preset-env",
        "@babel/preset-react"
    ],
    plugins: [
        [
            "@babel/plugin-transform-runtime",
            {
                corejs: 3,
                proposals: true
            }
        ],
        [
            "@babel/plugin-proposal-decorators",
            {
                legacy: true
            }
        ],
        "@babel/plugin-syntax-dynamic-import",
        "@babel/plugin-proposal-class-properties"
    ]
}