const express = require('express');
const login = require('./login');
const register = require('./register');
const profile = require('./profiles');
const user = require('./users');
const expense = require('./expenses');
const usergroups = require('./userGroups');
const userfriends = require('./userFriends');
const groups = require('./groups');

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/users/:id',user.findUser);
router.get('/users', user.findAllUsers);

router.post('/profile', profile.createProfile);
router.put('/profile', profile.updateProfile);

router.get('/usergroups/:group_id/:user_id', usergroups.findUserGroupByGroupIdUserID);
router.get('/usergroups/group/:group_id', usergroups.findUserGroupsByGroupId);
router.get('/usergroups/user/:user_id', usergroups.findUserGroupsByUserId);
router.post('/usergroups', usergroups.createUserGroup);
router.put('/usergroups', usergroups.updateUserGroup);
router.delete('/usergroups/:group_id/:user_id', usergroups.deleteUserGroupByGroupIdUserID);

router.get('/groups/:id',groups.findGroup);
router.get('/groups', groups.findAllGroups);
router.post('/groups', groups.createGroup);
router.put('/groups', groups.updateGroup);

router.get('/expenses/:group_id',expense.findExpensesByGroup);
router.get('/expenses/:user_id',expense.findExpensesByUser);
router.get('/expenses', expense.findAllExpenses);
router.post('/expenses', expense.createExpense);
router.delete('/expenses/:id', expense.deleteExpense);

router.get('/userfriends/:user_id', userfriends.findUserFriendsByUser);
router.post('/userfriends', userfriends.createUserFriends);
router.put('/userfriends', userfriends.updateUserFriends);

module.exports = router;