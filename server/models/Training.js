const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TrainingSchema = new Schema({
  title: String,
  description: String,
  venue: String,
  date: Date,
  slots: Number,
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Training', TrainingSchema);