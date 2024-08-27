
const Notification = require('../models/notification');
const Users = require('../models/user');

const createNotification = async (req, res) => {
    try {
        const { title, recipient, application, message } = req.body;

        const notification = new Notification({
            title,
            recipient,
            application,
            message
        });

        await notification.save();

        // Optionally, you can also push the notification reference to the user's notifications array
        // const user = await Users.findById(recipient);
        // user.notifications.push(notification._id);
        // await user.save();

        res.status(201).json(notification);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

const getNotificationsForUser = async (req, res) => {
    try {
        const notifications = await Notification.find();

        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

const markNotificationAsRead = async (req, res) => {
    try {
        const notificationId = req.params.id;

        const notification = await Notification.findById(notificationId);
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }

        notification.isRead = true;
        await notification.save();

        res.status(200).json(notification);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

const deleteNotification = async (req, res) => {
    try {
        const notificationId = req.params.id;

        const notification = await Notification.findById(notificationId);
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }

        await notification.remove();

        res.status(200).json({ message: 'Notification deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

module.exports ={createNotification,getNotificationsForUser,markNotificationAsRead,deleteNotification};
