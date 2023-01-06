const jsonwebtoken = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) =>{

    const auth = req.headers['authorization'];
console.log('cookie', req.cookies);
    if(!auth) return res.sendStatus(401);
    const token = auth.split(' ')[1];

    jsonwebtoken.verify(token,process.env.ACCESS_TOKEN_SECRET,
        (err, decode) =>{

            if(err) return res.sendStatus(403); // token invalid
            req.username = decode.username;
            next();
        })
        console.log('token', token);

}

module.exports = verifyJWT;
