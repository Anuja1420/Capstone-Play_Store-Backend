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
       } 
       = require('../Controllers/userController.js');

router.post('/register',registerUser); //Register the user
router.post('/login',loginUser); //Login the user
router.post('/logout', logoutUser); //Logout the user

//Get user profile by userId and admin token. Only admin can see user profile
router.get('/profile/userId/:id',protect,admin,getUserProfile);

router.get("/fetchusers",getAllUsers); //Only admin can see all users

router.get("/userId/:id",protect,admin,getUserById);//Only admin can get user by id

router.delete("/deleteuser/userId/:id",deleteUserById,);
       

module.exports = router;