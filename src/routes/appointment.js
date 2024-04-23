const express = require("express");
const router = express.Router();
const { connectToDatabase } = require("../db/connectAtlas");
const { constructQueryFromParameters } = require("../search/patient");
const {
  transformToFhirMongoFormat,
} = require("../metadata/transformAppointment");

router.get("/", async function (req, res) {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("appointment");

    const query = constructQueryFromParameters(req.query);

    const results = await collection.find(query).toArray();
    res.json(results);
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
