const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      item_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
      quantity: { type: Number, required: true, min: 1 },
      price: { type: Number, required: true, min: 0 },
    },
  ],
  total_amount: { type: Number, required: true, min: 0 },
  status: { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'pending' },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);
