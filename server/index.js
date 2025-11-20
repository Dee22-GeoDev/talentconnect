const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const talentRoutes = require("./routes/talentRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const trainingRoutes = require("./routes/trainingRoutes");

dotenv.config();
const app = express();

// // CORS FIX for Vite client (PORT 5173)
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// );
app.use(
  cors({
    origin: true,       // Accept requests from any origin
    credentials: true,  // Allow cookies/authorization headers
  })
);
app.use(express.json());

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/talents", talentRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/training", trainingRoutes);

// DATABASE + SERVER START
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(4000, "0.0.0.0", () => {
      console.log("Server running on port 4000");
    });
  })
  .catch((err) => console.log(err));
