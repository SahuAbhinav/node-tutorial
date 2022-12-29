const http = require('http');
const path = require('path');
const fs = require('fs');

const PORT = 3305;

const server  = http.createServer((req, res) => {

    console.log(req.url, req.method);

    res.setHeader("Content-Type", "application/json");
    res.writeHead(200);
    res.end(`{"message": "This is a JSON response"}`);
   
})

server.listen(PORT, () =>{

    console.log(`Server is running on port ${PORT}`);
})
