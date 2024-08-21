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
    enum: ['games', 'beauty', 'fashion', 'women', 'health'],
    required: true
  },
  visibility: {
    type: Boolean,
    default: true
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Application', applicationSchema);
