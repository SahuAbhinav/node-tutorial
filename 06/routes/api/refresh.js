const express = require('express');
const routes = express.Router();
const refreshTokenController = require('../../controller/RefreshTokenController');

routes.route("/")
    .get(refreshTokenController.handleRefreshToken);



module.exports = routes;