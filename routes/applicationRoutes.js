const express = require('express');
const router = express.Router();

const { protect, admin } = require('../middleware/authMiddleware.js');

const {
    postApplication,getApplication,getAppByAppId,getApplicationsByGenre,getAppFilterByCategory,
    getAppFilterByRating,getAppByName,updateAppById,deleteAppById,restrictAppVisibility} 
       = require('../Controllers/applicationController.js');


//router.post('/createapp',protect,admin,postApplication);// Create App By Admin Token
router.post('/applications/createapp', protect,admin, postApplication);
// router.get('/getapp/appId/:id',protect,admin,getApplication);//Get App by Admin Token
router.get('/getapp',getApplication);//*************** */
router.get('/getappbyappid/:appId',protect,getAppByAppId);

router.get('/genre/:genre',getApplicationsByGenre);//Anybody can search the app by genre
router.get('/getbycategory',getAppFilterByCategory);//Anybody can search the app by Category
//router.get('/rating/:rating',getApplicationsByRating);//Anybody can search the app by rating
//router.get('/appname/:name',getApplicationsByName);//Anybody can search the app by it's name
//router.get('/applications/searchapp',searchAppByName); //****************** */

router.get('/applications/appbyname/:name',getAppByName);
// router.get('/getcatrat',getAppByCatAndRat)//**** */

router.get('/getbyrating',getAppFilterByRating);


router.put("/updateapp/appId/:id",protect,admin,updateAppById);//Update app by appid admin token
router.delete("/deleteapp/appId/:id",protect,admin,deleteAppById,);//Delete app by appid Admin token
router.patch('/applications/:id/restrict',protect,restrictAppVisibility);//Issue --> visibilty is only for Admin -->How to change visibility to user
//As an owner, I should be able to restrict the visibility of the app from the user

module.exports = router;