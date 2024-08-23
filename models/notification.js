const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
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
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;


// const mongoose = require('mongoose');
// const notificationSchema = new mongoose.Schema({
//     message: { 
//         type: String, 
//         required: true 
//     },
//     date: { 
//         type: Date, 
//         default: Date.now 
//     },
//     userId: { 
//         type: mongoose.Schema.Types.ObjectId, 
//         ref: 'User' 
//     },
//     appId: { 
//         type: mongoose.Schema.Types.ObjectId, 
//         ref: 'Application' 
//     },
//     isRead: { 
//         type: Boolean, 
//         default: false 
//     }
// });
// module.exports = mongoose.model('Notification', notificationSchema);
