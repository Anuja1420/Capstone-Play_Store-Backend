// routes/applicationRoutes.js
const express = require('express');
const mongoose = require('mongoose');
const Application = require('../models/application');

// Create a new application
const postApplication = async (req, res) => {
    try {
      const application = new Application(req.body);
      await application.save();
      res.status(201).json(application);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

//Get Application

const getApplication =  async (req, res) => {
    try {
      const applications = await Application.find();
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

// Get applications by category
const getApplicationsByCategory = async (req, res) => {
  try {
      const { category } = req.params;
      const applications = await Application.find({ category });
      if (applications.length === 0) {
          return res.status(404).json({ message: 'No applications found for this category' });
      }
      res.status(200).json(applications);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

// Get applications by rating
const getApplicationsByRating = async (req, res) => {
  try {
      const { rating } = req.params;
      const applications = await Application.find({ rating });
      if (applications.length === 0) {
          return res.status(404).json({ message: 'No applications found for this rating' });
      }
      res.status(200).json(applications);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

//get application by name
const getApplicationsByName = async (req, res) => {
    try {
        const { name } = req.params;
        const applications = await Application.find({ name });
        if (applications.length === 0) {
            return res.status(404).json({ message: 'No applications found for this name' });
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

  //As an owner, I should be able to restrict the visibility of the app from the user.
  // Restrict the visibility of the app from the user
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

const searchApp = async (req, res) => {
  const { name, category, rating } = req.query;
  console.log(name,category,rating);
  let query = {};
  if (name) {
      query.name = { $regex: name, $options: 'i' }; // case-insensitive search
  }
  if (category && category !== 'all') {
      query.category = category;
  }
  if (rating && rating !== 'all') {
      query.rating = parseInt(rating);
  }

  try {
      const applications = await Application.find(query);
      res.json(applications);
  } catch (error) {
      res.status(500).json({ message: "Error fetching applications" });
  }
};


module.exports={postApplication,getApplication,
    getApplicationsByGenre,getApplicationsByCategory,getApplicationsByRating,
    getApplicationsByName,
    updateAppById,deleteAppById,restrictAppVisibility,searchApp};

