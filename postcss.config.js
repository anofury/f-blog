module.exports = {
    plugins: [
        require('autoprefixer')({
            "browsers": [
                "iOS >= 8",
                "android >= 4",
                "> 1%"
            ]
        })
    ]
}