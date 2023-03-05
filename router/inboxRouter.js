const express = require('express');
const router = express.Router();

// internal exports
const { getInbox } = require('../controller/inboxController');
const decorateHtmlRespose = require('../middlewares/common/decorateHtmlResponse');

//loginn page
router.get('/', decorateHtmlRespose('Inbox'), getInbox);

module.exports = router;
