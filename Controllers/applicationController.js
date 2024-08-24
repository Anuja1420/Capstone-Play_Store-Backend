// routes/applicationRoutes.js
const express = require('express');
const mongoose = require('mongoose');
const Application = require('../models/application');



//Post application for visibility
const postApplication = async (req, res) => {
  try {
    const application = new Application({
      ...req.body,
      ownerId: req.user._id, // Assuming req.user contains the logged-in user's ID
    });
    await application.save();
    res.status(201).json(application);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// // Create a new application
// const postApplication = async (req, res) => {
//     try {
//       const application = new Application(req.body);
//       await application.save();
//       res.status(201).json(application);
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
//   }
  
// //Get application for visibility
// const getApplication = async (req, res) => {
//   try {
//       const isAdmin = req.user.role === 'admin'; // Check if the user is an admin
//       const applications = await Application.find({
//           ...(isAdmin ? {} : { visibility: true }) // Only show visible applications to non-admins
//       });

//       res.status(200).json(applications);
//   } catch (error) {
//       res.status(500).json({ error: error.message });
//   }
// };


//Get Application
const getApplication =  async (req, res) => {
    try {
      const applications = await Application.find();
      res.status(200).json(applications);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

 // Get app by name
const getAppByName = async (req, res) => {
  try {
    const name = req.params.name;

    // Search the application by name (case-insensitive)
    const applications = await Application.find({ name: new RegExp(name, 'i') });

    if (applications.length === 0) {
      return res.status(404).json({ message: 'No applications found with the given name' });
    }

    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get applications by genre
const getApplicationsByGenre = async (req, res) => {
    try {
        const { genre } = req.params;
        const applications = await Application.find({ genre });
        if (applications.length === 0) {
            return res.status(404).json({ message: 'No applications found for this category' });
        }
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// // Get applications by category
// const getApplicationsByCategory = async (req, res) => {
//   try {
//       const { category } = req.params;
//       // if(!category){
//       //   const applications = await applications.find();
//       //   res.status(200).json(applications);
//       // }
//       const applications = await Application.find({ category });
//       if (applications.length === 0) {
//           return res.status(404).json({ message: 'No applications found for this category' });
//       }
//       res.status(200).json(applications);
//   } catch (error) {
//       res.status(500).json({ error: error.message });
//   }
// };

// // Get applications by rating

const getAppFilterByRating = async (req, res) => {
  try {
    const { ratings } = req.query; // Changed to req.query to match the query parameter

    // Find applications with the exact rating
    const applications = await Application.find({ ratings: Number(ratings)});

    if (applications.length === 0) {
      return res.status(404).json({ message: 'No applications found with the given rating' });
    }

    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// // Get applications by rating

const getAppFilterByCategory = async (req, res) => {
  try {
    const { category } = req.query; // Changed to req.query to match the query parameter

    // Find applications with the exact rating
    const applications = await Application.find({ category : category });

    if (applications.length === 0) {
      return res.status(404).json({ message: 'No applications found with the given rating' });
    }

    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Update an application by ID
const updateAppById = async (req, res) => {
    try {
      const application = await Application.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!application) {
        return res.status(404).json({ message: 'Application not found' });
      }
      res.status(200).json(application);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  // Delete an application by ID
  const deleteAppById = async (req, res) => {
    try {
      const application = await Application.findByIdAndDelete(req.params.id);
      if (!application) {
        return res.status(404).json({ message: 'Application not found' });
      }
      res.status(200).json({ message: 'Application deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

const restrictAppVisibility = async (req, res) => {
    try {
        const { id } = req.params;
        const { visibleToUsers } = req.body; // Expects { visibleToUsers: false } or { visibleToUsers: true }

        // Validate the input
        if (typeof visibleToUsers !== 'boolean') {
            return res.status(400).json({ message: 'Invalid value for visibility' });
        }

        const application = await Application.findByIdAndUpdate(
            id,
            { visibleToUsers },
            { new: true, runValidators: true }
        );

        if (!application) return res.status(404).json({ message: 'Application not found' });

        res.status(200).json(application);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//Get category and rating
// GET /applications

  // GET /applications/filter
  getAppByCatAndRat= async (req, res) => {
  try {
    const { category, minRating } = req.query;
    const query = {};

    if (category) {
      query.category = category;
    }
    if (minRating) {
      query.rating = { $gte: minRating };
    }

    const applications = await Application.find(query);
    res.json(applications);
  } catch (error) {
    res.status(500).send('Server Error');
  }
};





module.exports={postApplication,getApplication,
    getApplicationsByGenre,getAppFilterByCategory,getAppFilterByRating,
    
    updateAppById,deleteAppById,restrictAppVisibility,getAppByName,getAppByCatAndRat};

