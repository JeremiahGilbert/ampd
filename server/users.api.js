const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const sql = require('./sql');

exports.addUsersLogin = function (app) {
    app.route('/api/users/login').post((req, res) => {
        let username = req.body.username;
        let password = req.body.password;

        sql.connection.query('SELECT id, password FROM users WHERE username = ?', [username], (error, results, fields) => {
            if (error) {
                console.log(error);
                res.status(500).send();
                return;
            }
            let id = results[0].id;
            let passwordHash = results[0].password;

            bcrypt.compare(password, passwordHash, (error, same) => {
                if (error) {
                    console.log(error);
                    res.status(500).send();
                    return;
                }
                if (same) {
                    let token = jwt.sign(id, 'secret');
                    res.status(200).send({ token: token });
                    return;
                }
                res.status(401).send('Incorrect username or password.');
            });
        });
    });
}

exports.addUsersRegister = function (app) {
    app.route('/api/users/register').post((req, res) => {
        let username = req.body.username;
        let password = req.body.password;
        if (password.length < 8 || password.length > 64) {
            res.status(400).send('Password must be 8-64 characters.');
            return;
        }

        sql.connection.query('SELECT 1 FROM users WHERE username = ?', [username], (error, results, fields) => {
            if (error) {
                console.log(error);
                res.status(500).send();
                return;
            }
            if (results.length > 0) {
                res.status(409).send('Username in use.');
                return;
            }
            bcrypt.hash(password, 10, (error, hash) => {
                if (error) {
                    console.log(error);
                    res.status(500).send();
                    return;
                }
                connection.query('INSERT INTO users(username, password) VALUES(?, ?)', [username, hash]);
                res.status(201).send();
            });
        });
    });
}
