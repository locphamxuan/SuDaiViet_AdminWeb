const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const itemRoutes = require('./routes/itemRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const statsRoutes = require('./routes/statsRoutes');
const { seedSampleData } = require('./data/sampleData');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: '*'}));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Game Admin API is running' });
});

app.use('/users', userRoutes);
app.use('/items', itemRoutes);
app.use('/orders', orderRoutes);
app.use('/payments', paymentRoutes);
app.use('/stats', statsRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Server Error',
  });
});

connectDB()
  .then(async () => {
    console.log('Connected to MongoDB');
    await seedSampleData();
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on http://localhost:${PORT} and on all network interfaces`);
    });
  })
  .catch((err) => {
    console.error('Failed to start server:', err);
    process.exit(1);
  });
