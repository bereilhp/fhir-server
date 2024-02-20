const express = require("express");
const { connectToDatabase } = require("../db/connectAtlas");
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
const PORT = 3456;

app.get("/patients", async function (req, res) {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("patients");
    const patients = await collection.find().toArray();
    console.log("GET made to /patients endpoint");
    res.json(patients);
  } catch (error) {
    console.error("Error fetching patients:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/patients", async function (req, res) {
  try {
      const db = await connectToDatabase();
      const collection = db.collection("patients");
      const patient = req.body;
      const result = await collection.insertOne(patient);
      console.log("POST made to /patients endpoint");
      console.log("Patient added");
      res.status(201).json(result); 
  } catch (error) {
      console.error("Error adding patient:", error);
      res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
