const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TalentSchema = new Schema({
  name: String,
  email: String,
  phone: String,
  skills: [String],
  portfolioUrl: String,
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Talent', TalentSchema);