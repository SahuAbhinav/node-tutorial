const express = require('express');
const path = require('path');
const fsPromises = require('fs').promises;
const cors = require('cors');
const { json } = require('express');

const app = express();
const PORT = 3005


const myLogger = function (req, res, next) {
    console.log('LOGGED')
    // call appropiate url method using next()
    next()
}
const whilteList = ["https://mail.google.com", "http://localhost:3000"]
var corsOptions = {
    origin: (origin, callback) => {
        console.log(origin);
        if (whilteList.indexOf(origin) != -1 || !origin) {

            callback(null, true);
        }else{
            callback(new Error("Not allow by CORS"));
        }
    },
    optionsSuccessStatus: 200 // For legacy browser support
}

app.use(cors(corsOptions));

// call at every url call
app.use(myLogger);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));

app.use('/subdir', require('./routes/subdir'));

app.use('/employee', require('./routes/api/employee'));
app.use('/register', require('./routes/api/register'));
app.use('/auth', require('./routes/api/auth'));


app.get("/", (req, res) => {

    res.sendFile(path.join(__dirname, 'view', 'index.html'))
})

app.get("/new-index(.html)?", (req, res) => {

    res.sendFile(path.join(__dirname, 'view', 'new-index.html'))
})

app.get("/old-index.html", (req, res) => {
    // 302 default redirect , manually send 301 
    res.redirect(301, '/new-index.html')
})

app.get("/", (req, res) => {
    // 302 default redirect , manually send 301 
    res.redirect(301, '/new-index.html')
})

// next function will call next method in the chain.
const one = (req, res, next) => {
    console.log("one");

    next();

}

const two = (req, res, next) => {
    console.log('two');

    next();
}

const three = (req, res) => {
    console.log('three');
    res.send("three");

}

app.get('/chain', [one, two, three]);

app.all('*', (req, res, next) => {
    res.status(404);
    res.sendFile(path.join(__dirname, 'view', '404.html'))
})


app.listen(PORT, () => {

    console.log(`Listen on port : ${PORT}`)
})
