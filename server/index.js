const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("App runnig in background !!");
});

// Define routes
app.use("/api/users", require("./routes/api/users"));

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Running in port ${PORT}`);
});
