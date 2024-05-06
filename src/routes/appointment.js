const express = require("express");
const router = express.Router();
const { connectToDatabase } = require("../db/connectAtlas");
const {
  transformToFhirMongoFormat,
} = require("../metadata/transformAppointment");

function adjustQueryForResource(queryParams) {
  const adjustedQuery = {};
  for (const key in queryParams) {
    adjustedQuery[`resource.${key}`] = queryParams[key];
  }
  return adjustedQuery;
}

function adjustQueryForMetadata(queryParams) {
  const adjustedQuery = {};
  for (const key in queryParams) {
    adjustedQuery[`metadata.${key}`] = queryParams[key];
  }
  return adjustedQuery;
}

router.get("/", async function (req, res) {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("appointment");
    const mongoQuery = adjustQueryForResource(req.query);
    const count = await collection.countDocuments(mongoQuery);
    const results = await collection.find(mongoQuery).toArray();

    res.json({ count: count, appointments: results });
  } catch (error) {
    console.error("Error during search:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/metadata", async function (req, res) {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("appointment");
    const mongoQuery = adjustQueryForMetadata(req.query);
    const count = await collection.countDocuments(mongoQuery);
    const results = await collection.find(mongoQuery).toArray();

    res.json({ count: count, appointments: results });
  } catch (error) {
    console.error("Error during search:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", async function (req, res) {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("appointment");
    const appointment = req.body;
    const transformedAppointment = transformToFhirMongoFormat(appointment);
    const result = await collection.insertOne(transformedAppointment);
    console.log("Appointment added");
    res.status(201).json(result);
  } catch (error) {
    console.error("Error adding appointment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
