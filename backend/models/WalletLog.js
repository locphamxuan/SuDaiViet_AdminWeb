const mongoose = require('mongoose');

const walletLogSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  change_amount: { type: Number, required: true },
  type: { type: String, enum: ['credit', 'debit', 'refund', 'purchase'], required: true },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('WalletLog', walletLogSchema);
