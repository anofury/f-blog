const fs = require('fs');

function getArticleInfo(dir) {
    // 时间倒序
    let Articles = [];
    let articleFileNameList = fs.readdirSync(dir.input);

    articleFileNameList.forEach(articleFileName => {
        let readPath = `${dir.input}${articleFileName}`;
        let stat = fs.lstatSync(readPath);
        if (stat.isFile()) {
            let fetchPath = `${dir.output}${articleFileName}`;
            let fileData = fs.readFileSync(readPath, 'utf8');
            let articleHead = fileData.split(/\r?\n/).slice(1, 6), articleInfo = {};
            articleHead.forEach(line => {
                let splitIndex = line.indexOf(':');
                articleInfo[line.slice(0, splitIndex)] = line.slice(splitIndex + 1).trim();
            });
            articleInfo.tags = articleInfo.tags.split(/[,;，；]/).map(e => e.trim());
            articleInfo.path = fetchPath;
            Articles.push(articleInfo);
        }
    })
    Articles.sort((pre, next) => new Date(next.date) - new Date(pre.date));
    return JSON.stringify(Articles);
}

module.exports = { getArticleInfo }