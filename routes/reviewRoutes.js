const express = require('express');
const router = express.Router();

const { protect, admin } = require('../middleware/authMiddleware.js');

const {postNewReview,getReviewsByAppId,getAllReviews,getReviewById,createReview,updateReviewById,deleteReviewById} 
       = require('../Controllers/reviewController.js');

router.post('/reviews/appId/:appId/userId/:userId',postNewReview)
router.get('/reviews/:appId',getReviewsByAppId)
//-----------------------

router.get('/reviews/:appId/:userId',protect,getAllReviews);
router.get('/review/id/:id',protect,getReviewById);

// router.post('/review/:appId/:userId',protect,createReview);
//router.post('/reviews/:appId/:userId', protect, createReview);


router.put('/update/id/:id',protect,updateReviewById);
router.delete('/delete/id/:id',protect,admin,deleteReviewById);//changed to admin



module.exports = router;