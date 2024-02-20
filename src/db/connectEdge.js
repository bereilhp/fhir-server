require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_EDGE_URI;
const client = new MongoClient(uri);

const dbName = 'fhir-server';

async function connectToDatabaseEdge() {
  try {
    await client.connect();
    console.log('Connected successfully to MongoDB Edge');
    const db = client.db(dbName);
    return db;
  } catch (error) {
    console.error('Error connecting to MongoDB Edge:', error);
    throw error;
  }
}

module.exports = { connectToDatabaseEdge };