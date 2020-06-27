const fs = require('fs');
const crypto = require('crypto');

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
            let hash = crypto.createHash('sha256');
            hash.update(fileData);
            articleHead.forEach(line => {
                let splitIndex = line.indexOf(':');
                articleInfo[line.slice(0, splitIndex)] = line.slice(splitIndex + 1).trim();
            });
            articleInfo.categories = articleInfo.categories.split(/[,;，；]/).map(e => e.trim()).filter(e => e !== '');
            articleInfo.tags = articleInfo.tags.split(/[,;，；]/).map(e => e.trim()).filter(e => e !== '');
            articleInfo.path = fetchPath;
            articleInfo.hash = hash.digest('hex');
            Articles.push(articleInfo);
        }
    })
    Articles.sort((pre, next) => new Date(next.date) - new Date(pre.date));
    return JSON.stringify(Articles);
}

function getBoxBackImgs(BackroundImgDir) {
    const bgs = fs.readdirSync(BackroundImgDir.input);
    let bgsObj = { list: [], dir: BackroundImgDir.output, length: bgs.length };
    bgs.forEach(item => {
        let stat = fs.lstatSync(BackroundImgDir.input + item);
        if (stat.isFile()) {
            bgsObj.list.push(item);
        }
    });
    return JSON.stringify(bgsObj);
}

module.exports = { getArticleInfo, getBoxBackImgs }