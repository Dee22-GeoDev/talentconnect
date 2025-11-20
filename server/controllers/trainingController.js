const Training = require('../models/Training');

exports.list = async (req, res) => {
  const items = await Training.find().sort({ date: -1 });
  res.json(items);
};

exports.create = async (req, res) => {
  const t = new Training(req.body);
  await t.save();
  res.json(t);
};

exports.get = async (req, res) => {
  const t = await Training.findById(req.params.id);
  if (!t) return res.status(404).json({ error: 'Not found' });
  res.json(t);
};

exports.update = async (req, res) => {
  const t = await Training.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(t);
};

exports.remove = async (req, res) => {
  await Training.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
};