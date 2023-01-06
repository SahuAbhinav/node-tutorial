const jsonwebtoken = require('jsonwebtoken');
require('dotenv').config();
const userData = {
    users: require('../modal/users.json')

};

const handleRefreshToken = async (req, res) => {


    console.log('cookie', req.cookies);
    const cookie = req.cookies;
    if (!cookie?.jwt) return res.sendStatus(401); // no refresh token available 

    const refreshToken = cookie.jwt;


    const foundUser = userData.users.find(person => person.refreshToken == refreshToken);
    if (!foundUser) return res.sendStatus(403); // token invalid


    jsonwebtoken.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {

        if (err || foundUser.username != decoded.username) return res.sendStatus(403); // token invalid

        const accessToken = jsonwebtoken.sign({ username: foundUser.username },
            process.env.ACCESS_TOKEN_SECRET,
            { 'expiresIn': '30s' });



        return res.status(200).json({
            success: true,
            token: accessToken,
            username: foundUser.username

        });

    })
}
module.exports = { handleRefreshToken }