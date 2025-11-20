const Talent = require('../models/Talent');

exports.list = async (req, res) => {
  const items = await Talent.find().sort({ createdAt: -1 });
  res.json(items);
};

exports.create = async (req, res) => {
  const data = req.body;
  const t = new Talent({ ...data, createdBy: req.user ? req.user._id : null });
  await t.save();
  res.json(t);
};

exports.get = async (req, res) => {
  const t = await Talent.findById(req.params.id);
  if (!t) return res.status(404).json({ error: 'Not found' });
  res.json(t);
};

exports.update = async (req, res) => {
  const t = await Talent.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(t);
};

exports.remove = async (req, res) => {
  await Talent.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
};