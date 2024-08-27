const mongoose = require('mongoose');

const downloadSchema = new mongoose.Schema({
  appId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Application', 
    required: true 
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Users', 
    required: true 
  },
  downloadDate: { 
    type: Date, 
    required: true 
  },
  ownerId: {  //Added owner 25 Aug
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  }
});

const Download = mongoose.model('Download', downloadSchema);

module.exports = Download;
