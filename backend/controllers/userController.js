const User = require('../models/User');

const getUsers = async (req, res, next) => {
  try {
    const { search, status, page = 1, limit = 10 } = req.query;
    const filter = {};

    if (search) {
      filter.username = { $regex: search, $options: 'i' };
    }
    if (status) {
      filter.status = status;
    }

    const skip = (Number(page) - 1) * Number(limit);
    const total = await User.countDocuments(filter);
    const users = await User.find(filter)
      .sort({ last_login: -1 })
      .skip(skip)
      .limit(Number(limit));

    res.json({ data: users, total, page: Number(page), limit: Number(limit) });
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(updated);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUsers,
  updateUser,
};
