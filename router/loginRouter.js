const express = require('express');
const router = express.Router();

// internal exports
const { getLogin } = require('../controller/loginController');
const decorateHtmlRespose = require('../middlewares/common/decorateHtmlResponse');

//loginn page
router.get('/', decorateHtmlRespose('Login'), getLogin);

module.exports = router;
