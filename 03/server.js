const http = require('http');
const path = require('path');
const fs = require('fs');

const PORT = 3305;

const server  = http.createServer((req, res) => {

    console.log(req.url, req.method);

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment;filename=report.csv");
    res.writeHead(200);
    res.end(`id,name,email\n1,Sammy Shark,shark@ocean.com`);
   
})

server.listen(PORT, () =>{

    console.log(`Server is running on port ${PORT}`);
})
