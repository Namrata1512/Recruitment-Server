const { Job } = require('../models');

exports.create = async (req, res, next) => {
  const { title, description } = req.body;

  try {
    const job = await Job.create({
      title,
      description,
    });

    res.status(200).json(job);
  } catch (error) {
    next(error);
  }
};

exports.getById = async (req, res, next) => {
  const jobId = req.params.id;

  try {
    const job = await Job.findByPk(jobId);
    if (!job) {
      res.status(500).json({ message: 'Job not found' });
    } else {
      res.json(job);
    }
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  const jobId = req.params.id;
  const { title, description } = req.body;

  try {
    const job = await Job.findByPk(jobId);
    if (!job) {
      res.status(500).json({ message: 'Job not found' });
    } else {
      job.title = title;
      job.description = description;
      await job.save();
      res.json(job);
    }
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  const jobId = req.params.id;

  try {
    const job = await Job.findByPk(jobId);
    if (!job) {
      res.status(500).json({ message: 'Job not found' });
    } else {
      await job.destroy();
      res.json({ message: 'Job deleted' });
    }
  } catch (error) {
    next(error);
  }
};

