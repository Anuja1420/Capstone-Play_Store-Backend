const Notification = require('../models/notification');
const Application = require('../models/application');

const createNotification = async (recipientId, applicationId, message) => {
    const notification = new Notification({
        recipient: recipientId,
        application: applicationId,
        message: message
    });
    await notification.save();
    return notification;
};

const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ recipient: req.user._id });
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ error: 'Unable to retrieve notifications' });
    }
};

const markAsRead = async (req, res) => {
    try {
        const notification = await Notification.findById(req.params.id);
        if (!notification) {
            return res.status(404).json({ error: 'Notification not found' });
        }
        notification.isRead = true;
        await notification.save();
        res.status(200).json(notification);
    } catch (error) {
        res.status(500).json({ error: 'Unable to update notification' });
    }
};

module.exports = {
    createNotification,
    getNotifications,
    markAsRead
};
