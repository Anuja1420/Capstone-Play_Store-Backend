// models/Review.js /Comments
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
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
  review: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Review', reviewSchema);


// // models/Review.js /Comments
// const mongoose = require('mongoose');

// const reviewSchema = new mongoose.Schema({
//   appId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Application',
//     required: true
//   },
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   comment: {
//     type: String,
//     required: true
//   },
//   rating: {
//     type: Number,
//     min: 1,
//     max: 5,
//     required: true
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// module.exports = mongoose.model('Review', reviewSchema);
