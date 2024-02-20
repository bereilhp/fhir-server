require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_ATLAS_URI;
const client = new MongoClient(uri);

const dbName = 'fhir-server';

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected successfully to MongoDB Atlas');
    const db = client.db(dbName);
    return db;
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
    throw error;
  }
}

module.exports = { connectToDatabase };
