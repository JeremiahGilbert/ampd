const userAPI = require('./users.api');

const express = require('express');
const ampd = express();

const hostname = '127.0.0.1';
const port = 3001;

ampd.use(express.static('public'));

userAPI.addUsersRegister(ampd);

ampd.listen(port, hostname, () => console.log(`AMPD listening on port ${port}`));
