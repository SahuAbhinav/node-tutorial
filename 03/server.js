const http = require('http');
const path = require('path');
const fsPromises = require('fs').promises;

const PORT = 3305;


const serverCsv = (req, res) => {
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment;filename=report.csv");
    res.writeHead(200);
    res.end(`id,name,email\n1,Sammy Shark,shark@ocean.com`);

}

const serverHtml = (req, res) => {

    fsPromises.readFile(path.join(__dirname, 'view', 'index.html'), 'utf-8').then((data) => {

        res.setHeader("Content-Type", "text/html");
        res.writeHead(200);
        res.end(data);
    }).catch(err => {
        res.writeHead(500);
        res.end(err);
        return;
    });



}
const server = http.createServer((req, res) => {

    console.log(req.url, req.method);
    //serverCsv(req,res);
    serverHtml(req, res);


})

server.listen(PORT, () => {

    console.log(`Server is running on port ${PORT}`);
})
