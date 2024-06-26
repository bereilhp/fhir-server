const express = require("express");
const bodyParser = require("body-parser");
const appointmentRoutes = require("./routes/appointment");
const dynamicRoutes = require("./routes/dynamic");
const morgan = require("morgan");

const app = express();
const PORT = 3456;

app.use(bodyParser.json());
app.use(morgan("combined"));

app.use("/Appointment", appointmentRoutes);
app.use("/dynamic", dynamicRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
