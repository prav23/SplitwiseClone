const express = require('express');
const login = require('./login');
const register = require('./register');
const user = require('./users');
const groups = require('./groups');
const usergroups = require('./userGroups');
const registerGroup = require('./registerGroup');
const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/users/:id',user.findUser);
router.get('/users', user.findAllUsers);

router.get('/groups', groups);
router.get('/usergroups', usergroups);
router.post('/registerGroup', registerGroup);

module.exports = router;