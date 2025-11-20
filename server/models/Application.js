const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ApplicationSchema = new Schema({
  applicant: { type: Schema.Types.ObjectId, ref: 'Talent' },
  job: { type: Schema.Types.ObjectId, ref: 'Job' },
  coverLetter: String,
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Application', ApplicationSchema);