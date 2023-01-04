const express = require('express');
const routes = express.Router();
const employeeController = require('../../controller/EmployeeController');

routes.route("/")
    .get(employeeController.getAllEmployees)
    .post(employeeController.createNewEmployee)
    .put(employeeController.updateEmployee)
    .delete(employeeController.deleteEmployee);

routes.route("/:id").get(employeeController.getEmployee);



module.exports = routes;