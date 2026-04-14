const Payment = require('../models/Payment');

const getPayments = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const filter = {};

    if (status) {
      filter.status = status;
    }

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Payment.countDocuments(filter);
    const payments = await Payment.find(filter)
      .populate('user_id', 'username game_account')
      .sort({ created_at: -1 })
      .skip(skip)
      .limit(Number(limit));

    res.json({ data: payments, total, page: Number(page), limit: Number(limit) });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getPayments,
};
