const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    database: 'Shelf',
    user: 'root',
    password: ''
});

connection.connect(function(error){
    if(error)
    {
        throw error;
    }
    else
    {
        console.log('MySQL conectado');
    }
});

module.exports = connection;
