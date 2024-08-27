const express = require('express');
const router = express.Router();

const { downloadApplication } = require('../Controllers/downloadController.js');

router.post('/applications/:appId',downloadApplication);

module.exports = router;
