const express = require('express');
const router = express.Router();

const { protect, admin } = require('../middleware/authMiddleware.js');

const {getAllReviews,getReviewById,createReview,updateReviewById,deleteReviewById} 
       = require('../Controllers/reviewController.js');

router.get('/review/:appId/:userId',protect,getAllReviews);
router.get('/review/id/:id',protect,getReviewById);

// router.post('/review/:appId/:userId',protect,createReview);
router.post('/reviews/:appId/:userId', protect, createReview);


router.put('/update/id/:id',protect,updateReviewById);
router.delete('/delete/id/:id',protect,admin,deleteReviewById);//changed to admin



module.exports = router;