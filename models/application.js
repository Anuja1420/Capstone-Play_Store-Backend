const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  releaseDate: {
    type: Date,
    required: true
  },
  version: {
    type: String,
    required: true
  },
  ratings: {
    type: Number,
    min: 1,
    max: 5
  },
  genre: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Games', 'Beauty', 'Fashion', 'Women', 'Health'],
    required: true
  },
  visibility: {
    type: Boolean,
    default: true
  },
  owner :{  //Added this
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  // userId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User',
  //   required: true
  // },
  createdAt: {
    type: Date,
    default: Date.now
  },
  imageUrl: {  // Add this line
    type: String,
    required: false
  },
  review : {
    type : String,
    required : false
  },
  downloadcount :{
    type : Number,
    default : 0,
    required : false
  }
});

module.exports = mongoose.model('Application', applicationSchema);
