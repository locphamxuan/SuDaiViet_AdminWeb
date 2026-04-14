const mongoose = require('mongoose');
require('dotenv').config();
const { seedSampleData } = require('./data/sampleData');

(async () => {
  try {
    const uri = process.env.MONGO_CONNECTION_URI;
    if (!uri) {
      throw new Error('MONGO_CONNECTION_URI is missing in .env');
    }

    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to Atlas for seeding.');
    await seedSampleData();
    console.log('Seed completed.');
    await mongoose.disconnect();
  } catch (err) {
    console.error('Seed failed:', err.message);
    process.exit(1);
  }
})();
