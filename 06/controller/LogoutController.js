const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const fsPromises = require('fs').promises;
const path = require('path');
require('dotenv').config();
const userData = {
    users: require('../modal/users.json'),
    setUsers: (dt) => { userData.users = dt }
};

const performLogout = async (req, res) => {


    console.log('refresh cookie', req.cookies);
    const cookie = req.cookies;
    if (!cookie?.jwt) return res.sendStatus(204); // no content

    const refreshToken = cookie.jwt;


    const foundUser = userData.users.find(person => person.refreshToken == refreshToken);
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true });
        return res.sendStatus(205); // no content
    }

    res.clearCookie('jwt', { httpOnly: true });

    const otherUsers = userData.users.filter(function (obj) {
        return obj.username != foundUser.username;
    })
    foundUser.refreshToken = '';
    userData.setUsers([...otherUsers, foundUser]);
    await fsPromises.writeFile(path.join(__dirname, '..', 'modal', 'users.json'), JSON.stringify(userData.users));

    return res.status(200).json({
        success: true

    });






}

module.exports = { performLogout }