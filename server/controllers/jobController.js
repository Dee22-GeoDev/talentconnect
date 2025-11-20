const Job = require('../models/Job');

exports.list = async (req, res) => {
  const jobs = await Job.find().sort({ createdAt: -1 });
  res.json(jobs);
};

exports.create = async (req, res) => {
  const { title, description, company, location } = req.body;
  const job = new Job({ title, description, company, location, createdBy: req.user ? req.user._id : null });
  await job.save();
  res.json(job);
};

exports.get = async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) return res.status(404).json({ error: 'Not found' });
  res.json(job);
};

exports.update = async (req, res) => {
  const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(job);
};

exports.remove = async (req, res) => {
  await Job.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
};