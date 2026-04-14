const User = require('../models/User');
const Item = require('../models/Item');
const Order = require('../models/Order');
const Payment = require('../models/Payment');
const Wallet = require('../models/Wallet');
const WalletLog = require('../models/WalletLog');
const Inventory = require('../models/Inventory');

const seedSampleData = async () => {
  const userCount = await User.countDocuments();
  if (userCount > 0) {
    return;
  }

  const users = await User.create([
    { username: 'dragonMaster', game_account: 'dragon_001', level: 42, status: 'active', total_spending: 4200, last_login: new Date() },
    { username: 'pixelKnight', game_account: 'pixel_007', level: 18, status: 'inactive', total_spending: 980, last_login: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5) },
    { username: 'moonRogue', game_account: 'moon_99', level: 25, status: 'active', total_spending: 2100, last_login: new Date(Date.now() - 1000 * 60 * 60 * 12) },
  ]);

  const items = await Item.create([
    { name: 'Fire Sword', category: 'weapon', rarity: 'epic', price: 450 },
    { name: 'Healing Potion', category: 'consumable', rarity: 'common', price: 25 },
    { name: 'Dragon Armor', category: 'armor', rarity: 'legendary', price: 1200 },
    { name: 'Magic Ring', category: 'accessory', rarity: 'rare', price: 300 },
  ]);

  await Wallet.create(users.map((user) => ({ user_id: user._id, balance: Math.floor(Math.random() * 1000) + 100 })));

  await WalletLog.create([
    { user_id: users[0]._id, change_amount: 450, type: 'purchase' },
    { user_id: users[1]._id, change_amount: 120, type: 'credit' },
    { user_id: users[2]._id, change_amount: -75, type: 'debit' },
  ]);

  await Inventory.create([
    { user_id: users[0]._id, item_id: items[0]._id, quantity: 1 },
    { user_id: users[0]._id, item_id: items[1]._id, quantity: 5 },
    { user_id: users[2]._id, item_id: items[3]._id, quantity: 2 },
  ]);

  await Order.create([
    { user_id: users[0]._id, items: [{ item_id: items[0]._id, quantity: 1, price: 450 }], total_amount: 450, status: 'completed' },
    { user_id: users[2]._id, items: [{ item_id: items[3]._id, quantity: 2, price: 300 }], total_amount: 600, status: 'pending' },
  ]);

  await Payment.create([
    { user_id: users[0]._id, amount: 450, provider: 'stripe', status: 'completed' },
    { user_id: users[2]._id, amount: 120, provider: 'paypal', status: 'pending' },
  ]);

  console.log('Sample data has been seeded.');
};

module.exports = { seedSampleData };
