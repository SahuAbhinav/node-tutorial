const bcrypt = require('bcrypt');

const userData = {
    users: require('../modal/users.json')

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
        res.status(200).json({ 'message': 'login successfully.' })
    } else {
        res.status(401).json({ 'message': 'password not matched.' })
    }




}

module.exports = { auth }