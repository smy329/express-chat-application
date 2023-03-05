const express = require('express');
const router = express.Router();

// internal exports
const { getUsers } = require('../controller/usersController');
const decorateHtmlRespose = require('../middlewares/common/decorateHtmlResponse');

//loginn page
router.get('/', decorateHtmlRespose('Users'), getUsers);

module.exports = router;
