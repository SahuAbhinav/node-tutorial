const fs = require('fs');
const path = require('path')


const rs = fs.createReadStream(path.join(__dirname, 'files', 'large.txt'));

const ws = fs.createWriteStream(path.join(__dirname, 'files', 'large-2.txt'));

rs.pipe(ws);