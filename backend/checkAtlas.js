const { MongoClient } = require('mongodb');
require('dotenv').config();

(async () => {
  try {
    const uri = process.env.MONGO_CONNECTION_URI;
    if (!uri) {
      console.error('No MONGO_CONNECTION_URI found in .env');
      process.exit(1);
    }

    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    const admin = client.db().admin();
    const dbs = await admin.listDatabases();
    console.log('Databases:', dbs.databases.map((d) => d.name).join(', '));
    const db = client.db('gamedb');
    const cols = await db.listCollections().toArray();
    console.log('gamedb collections:', cols.map((c) => c.name).join(', '));
    const countUsers = await db.collection('users').countDocuments();
    console.log('users count:', countUsers);
    await client.close();
  } catch (err) {
    console.error('Atlas check failed:', err.message);
    process.exit(1);
  }
})();
