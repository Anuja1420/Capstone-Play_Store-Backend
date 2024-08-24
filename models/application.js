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
  }
});

module.exports = mongoose.model('Application', applicationSchema);

// const mongoose = require('mongoose');
// const applicationSchema = new mongoose.Schema({
//     name: { 
//       type: String, 
//       required: true 
//     },
//     description: 
//     { 
//       type: String, 
//       required: true 
//     },
//     releaseDate: {
//       type: Date, 
//       required: true 
//     },
//     version: { 
//       type: String, 
//       required: true 
//     },
//     ratings: { 
//       type: Number, 
//       required: true, 
//       min: 0, 
//       max: 5 
//     },
//     genre: {
//       type: String,
//       enum: ['games', 'beauty', 'fashion', 'women', 'health'],
//       required: true
//     },
//     categoryId: { 
//       type: mongoose.Schema.Types.ObjectId, 
//       ref: 'Category' 
//     },
//     ownerId: { 
//       type: mongoose.Schema.Types.ObjectId, 
//       ref: 'User', 
//       required: true
//     },
//     isVisible: { 
//       type: Boolean, 
//       default: true 
//     },
//     downloads: { 
//       type: Number, 
//       default: 0 
//     },
//     reviewId: [{ 
//       type: mongoose.Schema.Types.ObjectId, 
//       ref: 'Review' 
//     }]
// });
// module.exports = mongoose.model('Application', applicationSchema);





