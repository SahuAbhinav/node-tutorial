const express = require('express');
const routes = express.Router();
const path = require('path');


routes.route("/").get((req, res) => {

    //res.sendFile(path.join(__dirname, '..', 'data',  'employee.json'))
    const data = {};
    data.employees = require('../data/employee.json');
    res.json(data);

}).post((req, res) => {
    console.log("body",req.body);
    res.json({
        "name": req.body.name,
        "location": req.body.location
    })
}).put((req, res) => {
    res.json({
        "name": req.body.name,
        "location": req.body.location
    })
}).delete((req, res) => {
    res.json({
        "id": req.body.id
    })

})

routes.route("/:id").get((req,res) =>{

    res.json({
        id : req.params.id
    })
})



module.exports = routes;