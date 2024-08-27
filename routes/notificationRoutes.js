const express = require('express');
const {
    createNotification,
    getNotificationsForUser,
    markNotificationAsRead,
    deleteNotification
} = require('../Controllers/notificationController');
const { protect, admin } = require('../middleware/authMiddleware'); 

const router = express.Router();

//Only admin can create notification
router.post('/notifications',createNotification); //Only admin can create notification

// Route to get all notifications for the logged-in user
router.get('/allnotifications', getNotificationsForUser);

// Route to mark a notification as read
router.put('/notifications/:id/read', protect, markNotificationAsRead);

// Route to delete a notification
router.delete('/notifications/:id', protect, deleteNotification);

module.exports = router;
