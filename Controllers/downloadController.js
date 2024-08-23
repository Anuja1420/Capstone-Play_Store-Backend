const Application = require('../models/application');
const Download = require('../models/download');
const Notification = require('../models/notification');

const downloadApplication = async (req, res) => {
    try {
        const { appId } = req.params;
        const application = await Application.findById(appId).populate('owner');

        if (!application) {
            return res.status(404).json({ error: 'Application not found' });
        }

        // Log the download
        const download = new Download({
            user: req.user._id,
            application: application._id
        });
        await download.save();

        // Increment download count
        application.downloadCount += 1;
        await application.save();

        // Create a notification for the owner of the application
        const message = `Your application "${application.name}" has been downloaded!`;
        await Notification.create({
            recipient: application.owner._id,
            application: application._id,
            message: message,
        });

        res.status(200).json({ message: 'Application downloaded successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Unable to download application' });
    }
};

module.exports = {
    downloadApplication,
};
