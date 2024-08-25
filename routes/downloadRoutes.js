// const express = require('express');
// const router = express.Router();

// const { protect, admin } = require('../middleware/authMiddleware.js');

// const {downloadApplication} 
//        = require('../Controllers/downloadController.js');


// router.post('/applications/:appId/download',downloadApplication);


// module.exports = router;


const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware.js');
const { downloadApplication } = require('../Controllers/downloadController.js');

// Use the protect middleware for this route
router.post('/applications/:appId',downloadApplication);

module.exports = router;
