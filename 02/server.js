const fs = require('fs')
const path = require('path')

fs.readFile(path.join(__dirname, 'files', 'start.txt'), 'utf-8', (err, data) =>{

    console.log(data);
    
    fs.appendFile('./files/reply.txt', '\n\nI am fine', (err) =>{

        console.log('append success');
        
    })

})