const Application = require('../models/application');  
const Download = require('../models/download');  
const Notification = require('../models/notification');  
const Users = require('../models/user');  

// Get app by appId and update download count
const downloadApplication = async (req, res) => {
    try {
      const application = await Application.findById(req.params.appId);
      if (!application) {
        return res.status(404).send({ message: 'Application not found' });
      }
  
      // Increment the download count
      application.downloadcount = application.downloadcount  + 1;
  
      // Save the updated application
      await application.save();
  
      res.status(200).send(application);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

module.exports = {
    downloadApplication,
};

