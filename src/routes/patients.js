const express = require("express");
const router = express.Router();
const { connectToDatabase } = require("../db/connectAtlas");
const Ajv = require("ajv");
const addFormats = require("ajv-formats");
const patientSchema = require("../schemas/patient.json");
const { constructQueryFromParameters } = require("../search/patient");

const ajv = new Ajv({ discriminator: true });
addFormats(ajv);
const patientValidator = ajv.compile(patientSchema);

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
    const isValid = patientValidator(req.body);

    if (!isValid) {
      console.error("Error validating patient data:", patientValidator.errors);
      return res.status(400).json({
        error: "Invalid patient data",
        errors: patientValidator.errors,
      });
    }

    const db = await connectToDatabase();
    const collection = db.collection("patients");
    const patient = req.body;
    const result = await collection.insertOne(patient);
    console.log("Patient added");
    res.status(201).json(result);
  } catch (error) {
    console.error("Error adding patient:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
