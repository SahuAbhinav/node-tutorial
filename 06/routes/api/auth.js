const express = require('express');
const routes = express.Router();
const authController = require('../../controller/AuthController');
const logoutController = require('../../controller/LogoutController');

routes.route("/login")
    .post(authController.auth);

routes.route("/logout")
    .get(logoutController.performLogout);


module.exports = routes;