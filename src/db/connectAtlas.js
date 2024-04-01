require("dotenv").config();
const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_ATLAS_URI;
let db = null;

async function connectToDatabase() {
  if (db) {
    return db;
  }

  try {
    const client = new MongoClient(uri);
    await client.connect();
    console.log("Connected successfully to MongoDB Atlas");
    db = client.db("fhir-server");
    return db;
  } catch (error) {
    console.error("Error connecting to MongoDB Atlas:", error);
    throw error;
  }
}

module.exports = { connectToDatabase };
