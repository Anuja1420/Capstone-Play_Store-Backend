const mongoose = require('mongoose');

const downloadSchema = new mongoose.Schema({

  downloadId: { 
    type: String, 
    required: true, 
    unique: true },

  appId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Application', required: true },

  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true },

  downloadDate: { 
    type: Date, 
    required: true }
});

const Download = mongoose.model('Download', downloadSchema);

module.exports = Download;
