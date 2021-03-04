const express = require('express');
const test = require('./test');
const login = require('./login');
const home = require('./home');
const router = express.Router();

router.get('/test', test);
router.post('/login', login);
router.get('/home', home);

module.exports = router;