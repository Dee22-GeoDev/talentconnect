const Application = require('../models/Application');

exports.list = async (req, res) => {
  const items = await Application.find().populate('applicant job').sort({ createdAt: -1 });
  res.json(items);
};

exports.create = async (req, res) => {
  const data = req.body;
  const a = new Application(data);
  await a.save();
  res.json(a);
};

exports.get = async (req, res) => {
  const a = await Application.findById(req.params.id).populate('applicant job');
  if (!a) return res.status(404).json({ error: 'Not found' });
  res.json(a);
};

exports.update = async (req, res) => {
  const a = await Application.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(a);
};

exports.remove = async (req, res) => {
  await Application.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
};