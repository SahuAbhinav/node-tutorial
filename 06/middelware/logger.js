const fs = require('fs');
const fsPromises = require('fs').promises;
const { format } = require('date-fns');
const { v4: uuid } = require('uuid');
const path = require('path');

const myLogger = async (req, res, next) => {

    const msg = decodeURI(req.url) + '\t ' + req.method + '\t' + JSON.stringify( req.body) + '\t' + res.statusCode ;
    const dateTime = `${format(new Date(), 'yyyyMMdd\t HH:mm:ss')}`

    const logMsg = `${dateTime}\t ${uuid()} \t ${msg}\n`;

    if (!fs.existsSync(path.join(__dirname, '..','logs'))) {
        await fsPromises.mkdir(path.join(__dirname, '..','logs'));
    }

    await fsPromises.appendFile(path.join(__dirname, '..','logs', 'events.txt'), logMsg);

    next();
}

module.exports = myLogger;