const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const fsPromises = require('fs').promises;
const path = require('path');
require('dotenv').config();
const userData = {
    users: require('../modal/users.json'),
    setUsers: (dt) => { userData.users = dt }
};

const auth = async (req, res) => {


    let username = req.body.username;
    let password = req.body.password;

    if (!username || !password) {
        res.status(401).json({ "status": 'login failed' });
    }

    const userDetail = userData.users.find(person => person.username == username);
    if (!userDetail) {
        res.status(401).json({ "status": 'User not found' });
    }

    const match = await bcrypt.compare(password, userDetail.password);
    if (match) {

        const accessToken = jsonwebtoken.sign({ username },
            process.env.ACCESS_TOKEN_SECRET,
            { 'expiresIn': '30s' });

        const refreshToken = jsonwebtoken.sign({ username },
            process.env.REFRESH_TOKEN_SECRET,
            { 'expiresIn': '1d' });

        res.cookie('jwt', refreshToken, { expires: new Date(Date.now() + (24 * 60 * 60 * 1000)), httpOnly: true });

        const otherUsers = userData.users.filter(function (obj) {
            return obj.username != userDetail.username;
        })
        userDetail.refreshToken = refreshToken;
        userData.setUsers([...otherUsers, userDetail]);
        await fsPromises.writeFile(path.join(__dirname, '..', 'modal', 'users.json'), JSON.stringify(userData.users));

        return res.status(200).json({
            success: true,
            token: accessToken,
            username

        });

    } else {
        res.status(401).json({ 'message': 'password not matched.' })
    }




}

module.exports = { auth }