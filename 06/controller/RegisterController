const bcrypt = require('bcrypt');
const path = require('path');
const fsPromises = require('fs').promises;

const userData = {
    users: require('../modal/users.json'),
    setUsers: (dt) => { console.log("data", dt); userData.users = dt }
};

const register = async (req, res) => {


    let username = req.body.username;
    let password = req.body.password;

    const newPass = await bcrypt.hash(password, 10);
    console.log("newPass", newPass);
    const newUser = {
        username: username,
        password: newPass
    }
   
    userData.setUsers([...userData.users, newUser]);
    await fsPromises.writeFile(path.join(__dirname,'..','modal','users.json') , JSON.stringify(userData.users));

    res.status(201).json({'message': 'user Register successfully.'})

}

module.exports = {register}