const express = require('express');
const router = express.Router();

const { protect, admin } = require('../middleware/authMiddleware.js');

const {postNewReview,getReviewsByAppId,getAllReviews,getReviewById,updateReviewById,deleteReviewById} 
       = require('../Controllers/reviewController.js');

router.post('/reviews/appId/:appId/userId/:userId',protect,postNewReview) //Create new review
router.get('/reviews/:appId',getReviewsByAppId) //Get reviews by appid


router.get('/reviews/:appId/:userId',getAllReviews); //Get all reviews
router.get('/review/id/:id',getReviewById);//Get review by review id


router.put('/update/id/:id',protect,updateReviewById);//Update reiew by review id
router.delete('/delete/id/:id',protect,admin,deleteReviewById);//Only admin can delete review



module.exports = router;