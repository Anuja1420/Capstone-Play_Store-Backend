const express = require('express');
const router = express.Router();

const { protect, admin } = require('../middleware/authMiddleware.js');

const {postNewReview,getReviewsByAppId,getAllReviews,getReviewById,updateReviewById,deleteReviewById} 
       = require('../Controllers/reviewController.js');

router.post('/reviews/appId/:appId/userId/:userId',postNewReview) //Create new review
router.get('/reviews/:appId',getReviewsByAppId) //Get reviews by appid


router.get('/reviews/:appId/:userId',protect,getAllReviews); //Get all reviews
router.get('/review/id/:id',protect,getReviewById);//Get review by review id


router.put('/update/id/:id',protect,updateReviewById);//Update reiew by review id
router.delete('/delete/id/:id',protect,admin,deleteReviewById);//Only admin can delete review



module.exports = router;