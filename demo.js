const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'nikhil',
    password: '12345'
    database: 'Rentomojo',
    multipleStatements: true
});

mysqlConnection.connect((err) => {
    if (!err)
        console.log('DB connection succeded.');
    else
        console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
});


app.listen(3000, () => console.log('Express server is running at port no : 3000'));


//Get all employees
app.get('/phonebook', (req, res) => {
    mysqlConnection.query('SELECT * FROM phonebook', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Get an employees
app.get('/phonebook/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM phonebook WHERE Name = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Delete an employees
app.delete('/phonebook/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM Employee WHERE Name= ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully.');
        else
            console.log(err);
    })
});

//Insert an employees
app.post('/phonebook', (req, res) => {
    let emp = req.body;
    var sql = "SET @Name = ?;SET @Phone no. = ?;SET @Email = ?;SET @DOB = ?; \
    CALL EmployeeAddOrEdit(@Name,@Phoneno,@Email,@DOB);";
    mysqlConnection.query(sql, [phn.Name, phn.Phoneno, phn.Email, phn.DOB], (err, rows, fields) => {
        if (!err)
            rows.forEach(element => {
                if(element.constructor == Array)
                res.send('Inserted employee id : '+element[0].Name);
            });
        else
            console.log(err);
    })
});

//Update an employees
app.put('/phonebook', (req, res) => {
    let phn = req.body;
    var sql = "SET @Name = ?;SET @Phone no. = ?;SET @Email = ?;SET @ = ?; \
    CALL EmployeeAddOrEdit(@Name,@Phoneno,@Email,@DOB)";
    mysqlConnection.query(sql, [phn.Name, phn.Phoneno, phn.Email, phn.DOB], (err, rows, fields) => {
        if (!err)
            res.send('Updated successfully');
        else
            console.log(err);
    })
});