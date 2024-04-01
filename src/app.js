const express = require("express");
const bodyParser = require("body-parser");
const patientRoutes = require("./routes/patients");
const morgan = require("morgan");

const app = express();
const PORT = 3456;

app.use(bodyParser.json());
app.use(morgan("dev"));

app.use("/patients", patientRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
