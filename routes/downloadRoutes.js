const express = require('express');
const router = express.Router();
const { downloadApplication } = require('../Controllers/downloadController.js');
// const { protect } = require('../middleware/authMiddleware.js');

router.post('/applications/:appId',downloadApplication);

module.exports = router;
