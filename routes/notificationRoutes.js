const express = require('express');
const {
    createNotification,
    getNotificationsForUser,
    markNotificationAsRead,
    deleteNotification
} = require('../Controllers/notificationController');
const { protect, admin } = require('../middleware/authMiddleware'); 

const router = express.Router();

//Both user and admin can send notification
router.post('/notifications',createNotification); 

// Route to get all notifications for the logged-in user / admin
router.get('/allnotifications', getNotificationsForUser);

// Route to mark a notification as read
router.put('/notifications/:id/read', protect, markNotificationAsRead);

// Route to delete a notification
router.delete('/notifications/:id', protect, deleteNotification);

module.exports = router;
