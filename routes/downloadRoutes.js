const express = require('express');
const router = express.Router();

const { protect, admin } = require('../middleware/authMiddleware.js');

const {downloadApplication} 
       = require('../Controllers/reviewController.js');


router.post('/applications/:appId/download',protect, downloadApplication);


module.exports = router;