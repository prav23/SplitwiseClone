const express = require('express');
const login = require('./login');
const register = require('./register');
const user = require('./users');
const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/users', user.findAllUsers);
//router.get('/users',user.findUser);

module.exports = router;