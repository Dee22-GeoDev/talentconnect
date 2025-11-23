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

exports.create = async (req, res) => {
  try {
    const { title, bio, skills, experience_years, portfolio_url, resume_url } = req.body;
    
    const talent = new Talent({ 
      title,
      bio,
      skills,
      experience_years,
      portfolio_url,
      resume_url,
      createdBy: req.user._id 
    });
    
    await talent.save();
    res.json(talent);
  } catch (error) {
    console.error('Error creating talent profile:', error);
    res.status(500).json({ message: 'Failed to create profile' });
  }
};