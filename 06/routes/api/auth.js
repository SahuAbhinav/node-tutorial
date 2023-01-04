const express = require('express');
const routes = express.Router();
const authController = require('../../controller/AuthController');

routes.route("/")
    .post(authController.auth);



module.exports = routes;