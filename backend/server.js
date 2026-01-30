// backend/server.js
const express = require("express");
const cors = require("cors");

// Route imports
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const ngoRoutes = require("./routes/ngos");
const campaignRoutes = require("./routes/campaigns");
const donationRoutes = require("./routes/donations");
const volunteerRoutes = require("./routes/volunteers");

const app = express();

// ======================
// MIDDLEWARE
// ======================
app.use(cors());
app.use(express.json());

// ======================
// API ROUTES
// ======================
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/ngos", ngoRoutes);
app.use("/api/campaigns", campaignRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/volunteers", volunteerRoutes);

// ======================
// ROOT / HEALTH CHECK
// ======================
app.get("/", (req, res) => {
  res.send("HopeConnect Backend is running 🚀");
});

// ======================
// SERVER START
// ======================
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
