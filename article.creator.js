const fs = require('fs');
const { dateFormat } = require('./src/utils')

const argvs = process.argv
if (argvs.length < 3) console.error('Error: \n请输入文件名.')
else {
    const title = argvs[2]
    const fileName = `./public/article/${title}.md`
    const mdHead = `---\ntitle: ${title}\ndescription: ${title}\ndate: ${dateFormat()}\ncategories: \ntags: \n---\n\n# ${title}\n`

    fs.exists(fileName, exists => {
        if (exists) {
            console.error(`Error: \n文件 "${fileName}" 已经存在.`)
        }
        else {
            fs.writeFile(fileName, mdHead, 'utf8', err => {
                if (err) throw err
                else console.log(`Success: \n"${fileName}" 文件创建成功.\n开始畅所欲言吧~`)
            })
        }
    })
}