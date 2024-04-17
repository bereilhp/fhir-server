const express = require("express");
const router = express.Router();
const { connectToDatabase } = require("../db/connectAtlas");
const { constructQueryFromParameters } = require("../search/patient");
const { ObjectId } = require("mongodb");
const { transformToFhirMongoFormat } = require("../metadata/transformPatient");

router.get("/", async function (req, res) {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("patients");

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
    const collection = db.collection("patients");
    const patient = req.body;
    const transformedPatient = transformToFhirMongoFormat(patient);
    const result = await collection.insertOne(transformedPatient);
    console.log("Patient added");
    res.status(201).json(result);
  } catch (error) {
    console.error("Error adding patient:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
