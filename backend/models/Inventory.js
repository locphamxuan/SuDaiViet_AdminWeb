const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  item_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
  quantity: { type: Number, required: true, min: 0 },
});

module.exports = mongoose.model('Inventory', inventorySchema);
