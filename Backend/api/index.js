const express = require('express');
const test = require('./test');
const router = express.Router();

router.get('/test', test);

module.exports = router;