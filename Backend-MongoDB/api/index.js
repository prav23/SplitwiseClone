const express = require('express');
const passport = require("passport");

const user = require('./users');
const groups = require('./groups');
const expense = require('./expenses');
const usergroups = require('./userGroups');
const userfriends = require('./userFriends');
const profile = require('./profiles');

const router = express.Router();

router.post('/login', user.login);
router.post('/register', user.register);
router.get('/users/:id', passport.authenticate("jwt", { session: false }), user.findUser);
router.get('/users', passport.authenticate("jwt", { session: false }), user.findAllUsers);

router.post('/profile', passport.authenticate("jwt", { session: false }), profile.createProfile);
router.put('/profile', passport.authenticate("jwt", { session: false }), profile.updateProfile);
router.get('/profile/:user_id', passport.authenticate("jwt", { session: false }), profile.getProfile);

//router.get('/usergroups/:group_id/:user_id', usergroups.findUserGroupByGroupIdUserID);
router.get('/usergroups/group/:group_id', passport.authenticate("jwt", { session: false }), usergroups.findUserGroupsByGroupId);
router.get('/usergroups/user/:user_id', passport.authenticate("jwt", { session: false }), usergroups.findUserGroupsByUserId);
router.post('/usergroups', passport.authenticate("jwt", { session: false }), usergroups.createUserGroup);
router.put('/usergroups/settle', passport.authenticate("jwt", { session: false }), usergroups.settleUserGroup);
router.put('/usergroups/expense', passport.authenticate("jwt", { session: false }), usergroups.addExpenseUserGroup);
router.put('/usergroups/groupinvite', passport.authenticate("jwt", { session: false }), usergroups.acceptUserGroupInvite);
router.delete('/usergroups/:group_id/:user_id', passport.authenticate("jwt", { session: false }), usergroups.deleteUserGroupByGroupIdUserID);

router.get('/groups/:id', passport.authenticate("jwt", { session: false }), groups.findGroup);
router.get('/groups', passport.authenticate("jwt", { session: false }), groups.findAllGroups);
router.post('/groups', passport.authenticate("jwt", { session: false }), groups.createGroup);
router.put('/groups', passport.authenticate("jwt", { session: false }), groups.updateGroup);

router.get('/expenses/:group_id', passport.authenticate("jwt", { session: false }), expense.findExpensesByGroup);
//router.get('/expenses/:user_id',expense.findExpensesByUser);
router.get('/expenses', passport.authenticate("jwt", { session: false }), expense.findAllExpenses);  
router.post('/expenses', passport.authenticate("jwt", { session: false }), expense.createExpense);
router.delete('/expenses/:id', passport.authenticate("jwt", { session: false }), expense.deleteExpense);

router.get('/userfriends/:user_id', passport.authenticate("jwt", { session: false }), userfriends.findUserFriendsByUser);
router.put('/userfriends/settle', passport.authenticate("jwt", { session: false }), userfriends.settleFriends);
router.put('/userfriends/expense', passport.authenticate("jwt", { session: false }), userfriends.addExpenseUserFriends);

router.post('/userfriends', passport.authenticate("jwt", { session: false }), userfriends.createUserFriends);
router.put('/userfriends', passport.authenticate("jwt", { session: false }), userfriends.updateUserFriends);


module.exports = router;