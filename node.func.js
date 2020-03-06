const fs = require('fs');

function GetBackroundImgConfig(BackroundImgDir) {
    const bgs = fs.readdirSync(BackroundImgDir.PACK);
    let bgsObj = { list: [], dir: BackroundImgDir.PAGE, length: bgs.length };
    bgs.forEach(item => {
        let stat = fs.lstatSync(BackroundImgDir.PACK + item);
        if (stat.isFile()) {
            bgsObj.list.push(item);
        }
    });
    return JSON.stringify(bgsObj);
}

module.exports = { GetBackroundImgConfig };