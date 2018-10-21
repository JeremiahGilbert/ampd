const mysql = require('mysql');

exports.connection = mysql.createConnection({
    host: 'localhost',
    user: 'ampd',
    password: 'web2.0',
    database: 'ampd',
    timeout: 0
});
exports.connection.connect();
