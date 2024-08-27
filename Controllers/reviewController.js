const Review = require('../models/reviews.js');
const Application = require('../models/application.js');
const User = require('../models/user.js');


//Create a new review 
const postNewReview = async (req, res) => {
  try {
      const { appId, userId } = req.params;
      const { review, rating } = req.body;

      const newReview = new Review({
          appId,
          userId,
          review,
          rating,
      });

      await newReview.save();
      res.status(201).json({ message: 'Review created successfully', review: newReview });
  } catch (error) {
      console.error('Error saving review:', error);
      res.status(500).json({ message: 'Failed to save review' });
  }
};


//get all reviews
  const getAllReviews = async (req, res) => {
    try {
        const { appId, userId } = req.params;

        // Validate that the appId and userId exist
        const application = await Application.findById(appId);
        const user = await User.findById(userId);

        if (!application) return res.status(404).json({ message: 'Application not found' });
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Fetch reviews based on appId and userId
        const reviews = await Review.find({ appId: appId, userId: userId }).populate('appId').populate('userId');
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Get a review by ID
const getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id).populate('appId').populate('userId');
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//
// Get reviews for a specific application
const getReviewsByAppId = async (req, res) => {
    try {
        const { appId } = req.params;
        const reviews = await Review.find({ appId }).populate('userId', 'username'); // Adjust 'username' to the actual field you want to show
  
        if (reviews.length === 0) {
            return res.status(404).json({ message: 'No reviews found for this application' });
        }
  
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  };

// Update a review by ID
const updateReviewById = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.status(200).json(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a review by ID
const deleteReviewById = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {postNewReview, getAllReviews, getReviewById,getReviewsByAppId, updateReviewById, deleteReviewById};


