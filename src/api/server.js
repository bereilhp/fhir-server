const express = require("express");
const { connectToDatabase } = require("../db/connectAtlas");
const app = express();
const PORT = 3456;

app.get("/patients", async function (req, res) {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("patients");
    const patients = await collection.find().toArray();
    console.log("API call made to /patients endpoint");
    res.json(patients);
  } catch (error) {
    console.error("Error fetching patients:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
