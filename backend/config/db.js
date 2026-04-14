const mongoose = require('mongoose');

const getMongoUrl = () => {
  return process.env.MONGO_CONNECTION_URI || 'mongodb://localhost:27017/gamedb';
};

const connectDB = async () => {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  const mongoUrl = getMongoUrl();
  const connection = await mongoose.connect(mongoUrl, options);
  console.log(`MongoDB connected to ${connection.connection.host} / ${connection.connection.name}`);
  return connection.connection;
};

module.exports = connectDB;
