const express = require('express');
const router = express.Router();

const { protect, admin } = require('../middleware/authMiddleware.js');

const {loginUser,registerUser,logoutUser} 
       = require('../Controllers/userController.js');

router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/logout', logoutUser);
//router.get('/:id', protect, getUserById); // Protect route ensures only logged-in users can access



module.exports = router;