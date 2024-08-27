const express = require('express');
const router = express.Router();

const { protect, admin } = require('../middleware/authMiddleware.js');

const {
    postApplication,getApplication,getAppByAppId,getApplicationsByGenre,getAppFilterByCategory,
    getAppFilterByRating,getAppByName,updateAppById,deleteAppById,restrictAppVisibility} 
       = require('../Controllers/applicationController.js');



router.post('/applications/createapp', protect,admin, postApplication);

router.get('/getapp',getApplication);//get all applications

router.get('/getappbyappid/:appId',protect,getAppByAppId);

router.get('/genre/:genre',getApplicationsByGenre);//Anybody can search the app by genre

router.get('/getbycategory',getAppFilterByCategory);//Anybody can search the app by Category

router.get('/applications/appbyname/:name',getAppByName);//Get application by name

router.get('/getbyrating',getAppFilterByRating);//Get application by rating


router.put("/updateapp/appId/:id",protect,admin,updateAppById);//Update app by appid admin token
router.delete("/deleteapp/appId/:id",protect,admin,deleteAppById,);//Delete app by appid Admin token
router.patch('/applications/:id/restrict',protect,restrictAppVisibility); //Admin can restrict visibility


module.exports = router;