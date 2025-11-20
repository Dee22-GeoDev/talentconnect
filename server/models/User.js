const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    trim: true
  },

  passwordHash: { 
    type: String,
    required: true
  },

  fullName: { 
    type: String, 
    required: true 
  },

  phone: { 
    type: String 
  },

  role: { 
    type: String, 
    enum: ["talent", "recruiter", "admin"],
    default: "talent"
  },

  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('User', UserSchema);
