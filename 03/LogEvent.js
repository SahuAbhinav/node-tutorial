const fs = require('fs');
const fsPromises = require('fs').promises;
const { format } = require('date-fns');
const { v4: uuid } = require('uuid');
const path = require('path');

const log = async (msg) => {

    const dateTime = `${format(new Date(), 'yyyyMMdd\t HH:mm:ss')}`

    const logMsg = `${dateTime}\t ${uuid()} \t ${msg}\n`;

    if(!fs.existsSync(path.join(__dirname, 'logs'))){
        await fsPromises.mkdir(path.join(__dirname, 'logs'));
    }

    await fsPromises.appendFile(path.join(__dirname, 'logs','events.txt'), logMsg);
}

module.exports = log;