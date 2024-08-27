const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    title :{
        type : String,
        required : true
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users', //Updated Reference
        required: true
    },
    application: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application',
        required: true
    },
    message: {
        type: String,
        required: true
    },
    isRead: {
        type: Boolean,
        default: false // Indicates whether the notification has been read
    },
    createdAt: {
        type: Date,
        default: Date.now // Automatically set the creation time of the notification
    }
});

module.exports = mongoose.model('Notification', notificationSchema);


