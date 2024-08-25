// const Application = require('../models/application');
// const Download = require('../models/download');
// const Notification = require('../models/notification');

// const downloadApplication = async (req, res) => {
//     try {
//         const { appId } = req.params;
//         //console.log(`Received appId: ${appId}`); //********** */
//         const application = await Application.findById(appId).populate('owner');

//         if (!application) {
//             return res.status(404).json({ error: 'Application not found' });
//         }

//         // Log the download
//         const download = new Download({
//             appId: application._id,
//             userId: req.user._id,
//             downloadDate: new Date(),
//         });
//         await download.save();
//         //console.log('Download logged:', download); //********** */

//         // Increment download count
//         application.downloadCount += 1;
//         await application.save();

//         // Create a notification for the owner of the application
//         const message = `Your application "${application.name}" has been downloaded!`;
//         await Notification.create({
//             recipient: application.owner._id,
//             application: application._id,
//             message: message,
//         });

//         res.status(200).json({ message: 'Application downloaded successfully' });
//     } catch (error) {
//         res.status(500).json({ error: 'Unable to download application' });
//     }
// };

// module.exports = {
//     downloadApplication,
// };

//--------------------------------
const Application = require('../models/application');  // Ensure this path is correct
const Download = require('../models/download');  // Ensure this path is correct
const Notification = require('../models/notification');  // Ensure this path is correct
const Users = require('../models/user');  // Ensure this path is correct

// const downloadApplication = async (req, res) => {
//     try {
//         const { appId } = req.params;
//         const application = await Application.findById(appId).populate('owner');
//         console.log(application);
        

//         if (!application) {
//             return res.status(404).json({ error: 'Application not found' });
//         }

//         // // Check if the owner exists
//         // if (!application.owner) {
//         //     return res.status(400).json({ error: 'Application owner not found' });
//         // }

//         // Log the download
//         const download = new Download({
//             appId: application._id,
//             // userId: req.users._id,
//             userId: req.user._id,
//             downloadDate: new Date(),
            
//         });
//         // console.log(req.user)
//         await download.save();
        

//         // Increment download count
//         application.downloadcount += 1;
//         await application.save();

//         // Create a notification for the owner of the application
//         const message = `Your application "${application.name}" has been downloaded!`;
//         await Notification.create({
//             recipient: application.owner._id,
//             application: application._id,
//             message: message,
//         });

//         res.status(200).json({ message: 'Application downloaded successfully' });
//     } catch (error) {
//         console.error('Error in downloadApplication:', error); // This will log the exact error message
//         res.status(500).json({ error: 'Unable to download application' });
//     }
// };

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

//----------------------------------

// const Application = require('../models/application');
// const Download = require('../models/download');
// const users = require('../models/user');
// const Notification = require('../models/notification');

// const downloadApplication = async (req, res) => {
//     try {
//         const { appId } = req.params;
//         const application = await Application.findById(appId).populate('owner');

//         if (!application) {
//             return res.status(404).json({ error: 'Application not found' });
//         }

//          // Ensure req.user is available and has _id

//         //  if (!req.user || !req.users._id) {

//         //     return res.status(401).json({ error: 'User not authenticated' });

//         // }

//         // Log the download
//         const download = new Download({
//             appId: application._id,
//             userId: req.users._id, //************* */
//             downloadDate: new Date(),
//         });
//         await download.save();

//         // Increment download count
//         // application.downloadCount += 1;
//         application.downloadCount += 1;
//         await application.save();

//         // Create a notification for the owner of the application
//         const message = `Your application "${application.name}" has been downloaded!`;

//         await Notification.create({
//             recipient: application.owner._id,
//             application: application._id,
//             message: message,
//         });

//         res.status(200).json({ message: 'Application downloaded successfully' });
//     } catch (error) {
//         console.error('Error in downloadApplication:', error);
//         res.status(500).json({ error: 'Unable to download application' });
//     }
// };

// module.exports = {
//     downloadApplication,
// };
