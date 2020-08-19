const express = require("express");
const cors = require("cors");
const connectDB = require("./db/connectDB");

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
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/admin", require("./routes/api/admin"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/exam", require("./routes/api/exam"));
app.use("/api/forgotPassword", require("./routes/api/forgotPassword"));

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Running in port ${PORT}`);
});
