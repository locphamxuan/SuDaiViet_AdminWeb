const Order = require('../models/Order');
const User = require('../models/User');

const getRevenueStats = async (req, res, next) => {
  try {
    const revenue = await Order.aggregate([
      { $match: { status: 'completed' } },
      { $group: { _id: null, totalRevenue: { $sum: '$total_amount' }, orderCount: { $sum: 1 } } },
    ]);

    const result = revenue[0] || { totalRevenue: 0, orderCount: 0 };
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const getUserStats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ status: 'active' });
    const inactiveUsers = await User.countDocuments({ status: 'inactive' });
    const bannedUsers = await User.countDocuments({ status: 'banned' });

    res.json({ totalUsers, activeUsers, inactiveUsers, bannedUsers });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getRevenueStats,
  getUserStats,
};
