const mysql = require('mysql');
const express = require('express');
const bodyparser = require('body-parser');
const { query } = require('express');

var app = express();
app.use(bodyparser.json());

// Parameters for connecting to the 'phonebook' MySQL Database
var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'phonebook',
    port: '3306',
    multipleStatements: true
});

// Attempt to connect to the 'phonebook' MySQL Database
mysqlConnection.connect((err) => {
    if (!err) {
        console.log('Connection successfully established...');
    } else {
        console.log('Connection failed to establish; ' + JSON.stringify(err, undefined, 2));
    }
});

// Begin listening for requests on port 8080
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`App listening on port: ${port}...`));
