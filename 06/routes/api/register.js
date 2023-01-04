const express = require('express');
const routes = express.Router();
const registerController = require('../../controller/RegisterController');

routes.route("/")
    .post(registerController.register);



module.exports = routes;