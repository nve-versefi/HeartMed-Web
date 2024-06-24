const connect = require('./app/lib/mongodb').default;
const menuData = require('./components/menuData').default;
const { MongoClient } = require('mongodb');

require('dotenv').config();

async function seedDatabase() {
  let client;

  try {
    client = await connect();
    if (!client) {
      throw new Error('Failed to connect to the database');
    }

    const db = client.db(process.env.DB_NAME);
    const collection = db.collection('menuItems');

    // Clear existing data
    await collection.deleteMany({});

    // Insert new data
    await collection.insertMany(menuData);

    console.log('Data successfully seeded');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    if (client) {
      await client.close();
    }
  }
}

seedDatabase();
