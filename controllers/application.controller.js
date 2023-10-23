const { Application } = require('../models');

exports.create = async (req, res, next) => {
  const { jobId, userId, trackingStatus, coverLetter, resumeUrl } = req.body;

  try {
    const application = await Application.create({
      jobId,
      userId,
      trackingStatus,
      coverLetter,
      resumeUrl,
    });

    res.status(200).json(application);
  } catch (error) {
    next(error);
  }
};

exports.getById = async (req, res, next) => {
  const applicationId = req.params.id;

  try {
    const application = await Application.findByPk(applicationId);
    if (!application) {
      res.status(500).json({ message: 'Application not found' });
    } else {
      res.json(application);
    }
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  const applicationId = req.params.id;
  const { jobId, userId, trackingStatus, coverLetter, resumeUrl } = req.body;

  try {
    const application = await Application.findByPk(applicationId);
    if (!application) {
      res.status(500).json({ message: 'Application not found' });
    } else {
      application.jobId = jobId;
      application.userId = userId;
      application.trackingStatus = trackingStatus;
      application.coverLetter = coverLetter;
      application.resumeUrl = resumeUrl;
      await application.save();
      res.json(application);
    }
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  const applicationId = req.params.id;

  try {
    const application = await Application.findByPk(applicationId);
    if (!application) {
      res.status(500).json({ message: 'Application not found' });
    } else {
      await application.destroy();
      res.json({ message: 'Application deleted' });
    }
  } catch (error) {
    next(error);
  }
};
