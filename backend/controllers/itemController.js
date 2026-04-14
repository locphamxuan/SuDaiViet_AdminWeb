const Item = require('../models/Item');

const getItems = async (req, res, next) => {
  try {
    const { search, category, rarity, page = 1, limit = 10 } = req.query;
    const filter = {};

    if (search) {
      filter.name = { $regex: search, $options: 'i' };
    }
    if (category) {
      filter.category = category;
    }
    if (rarity) {
      filter.rarity = rarity;
    }

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Item.countDocuments(filter);
    const items = await Item.find(filter).skip(skip).limit(Number(limit));

    res.json({ data: items, total, page: Number(page), limit: Number(limit) });
  } catch (err) {
    next(err);
  }
};

const getItem = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(item);
  } catch (err) {
    next(err);
  }
};

const createItem = async (req, res, next) => {
  try {
    const newItem = await Item.create(req.body);
    res.status(201).json(newItem);
  } catch (err) {
    next(err);
  }
};

const updateItem = async (req, res, next) => {
  try {
    const updated = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

const deleteItem = async (req, res, next) => {
  try {
    const removed = await Item.findByIdAndDelete(req.params.id);
    if (!removed) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json({ message: 'Item deleted' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
};
