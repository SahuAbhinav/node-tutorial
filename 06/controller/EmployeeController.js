const data = {
    employees: require('../modal/employee.json'),
    setEmployees: (dt) => { console.log("data",dt); data.employees = dt }
};

const getAllEmployees = (req, res) => {

    res.json(data);

};

const createNewEmployee = (req, res) => {
    console.log("body", req.body);
    const newEmployee = {
        "id": 3,
        "name": req.body.name,
        "location": req.body.location
    };
    console.log("new data", newEmployee);
    data.setEmployees([...data.employees, newEmployee]);

    res.json(data.employees);

};

const updateEmployee = (req, res) => {
    res.json({
        "name": req.body.name,
        "location": req.body.location
    })
};

const deleteEmployee = (req, res) => {
    res.json({
        "id": req.body.id
    })
};

const getEmployee = (req, res) => {
    res.json({
        id: req.params.id
    })
}

module.exports = { getAllEmployees, getEmployee, createNewEmployee, updateEmployee, deleteEmployee }
