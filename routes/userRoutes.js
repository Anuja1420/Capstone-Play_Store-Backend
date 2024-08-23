// const express = require('express');
// const router = express.Router();

// const { protect, admin } = require('../middleware/authMiddleware.js');

// const {loginUser,registerUser,logoutUser} 
//        = require('../Controllers/userController.js');

// router.post('/register',registerUser);
// router.post('/login',loginUser);
// router.post('/logout', logoutUser);
// //router.get('/:id', protect, getUserById); // Protect route ensures only logged-in users can access



// module.exports = router;


const express = require('express');
const router = express.Router();

const { protect, admin } = require('../middleware/authMiddleware.js');

const {loginUser,registerUser,logoutUser,
       getUserProfile,getAllUsers,
       getUserById,deleteUserById,
       deactivateUser,activateUser} 
       = require('../Controllers/userController.js');

router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/logout', logoutUser);

router.get('/profile/userId/:id',protect,admin,getUserProfile);//Get user profile by userId and admin token.Only admin can see user profile
router.get("/",protect,admin,getAllUsers); //Only admin can see all users
router.get("/userId/:id",protect,admin,getUserById);//Only admin can get user by id
router.put("/deactivate/userId/:id",protect,admin,deactivateUser);
router.put('/activate/userId/:id',protect,admin,activateUser);
router.delete("/deleteuser/userId/:id",protect,admin,deleteUserById,);
       

module.exports = router;