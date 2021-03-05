const express = require('express');
const test = require('./test');
const login = require('./login');
const register = require('./register');
const router = express.Router();

router.get('/test', test);
router.post('/login', login);
router.post('/register', register);
//router.get('/login', login);

module.exports = router;