const mysql = require('mysql');
const express = require('express');
const bodyparser = require('body-parser');
const { query } = require('express');

var app = express();
app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'phonebook',
    port: '3306',
    multipleStatements: true
});

mysqlConnection.connect((err) => {
    if (!err) {
        console.log('Connection successfully established...');
    } else {
        console.log('Connection failed to establish; ' + JSON.stringify(err, undefined, 2));
    }
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`App listening on port: ${port}...`));