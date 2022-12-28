const fsPr = require('fs').promises;
const path = require('path');

const ops = async () => {
    try {

        const data = await fsPr.readFile(path.join(__dirname, 'files','start.txt'),'utf-8');
        console.log(data);

        await fsPr.unlink(path.join(__dirname, 'files','start.txt'));

        await fsPr.appendFile(path.join(__dirname, 'files','new-start.txt'),data+' \n\n I am fine');

        const newData = await fsPr.readFile(path.join(__dirname, 'files','new-start.txt'),'utf-8');
        console.log(newData);

    } catch (err) {
        console.error(err);
    }

    
}

ops();