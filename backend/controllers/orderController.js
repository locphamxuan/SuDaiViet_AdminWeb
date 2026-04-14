const Order = require('../models/Order');

const getOrders = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const filter = {};

    if (status) {
      filter.status = status;
    }

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Order.countDocuments(filter);
    const orders = await Order.find(filter)
      .populate('user_id', 'username game_account')
      .populate('items.item_id', 'name category price')
      .sort({ created_at: -1 })
      .skip(skip)
      .limit(Number(limit));

    res.json({ data: orders, total, page: Number(page), limit: Number(limit) });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getOrders,
};
