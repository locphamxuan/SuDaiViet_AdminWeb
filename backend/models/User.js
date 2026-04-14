const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  game_account: { type: String, required: true },
  level: { type: Number, default: 1 },
  status: { type: String, enum: ['active', 'inactive', 'banned'], default: 'active' },
  total_spending: { type: Number, default: 0 },
  last_login: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
