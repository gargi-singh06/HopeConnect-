const express = require("express");
const router = express.Router();

const users = require("../data/users.json");

// USER LOGIN (mock)
router.post("/user-login", (req, res) => {
  const { email } = req.body;

  const user = users.find(u => u.email === email);

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "User not found"
    });
  }

  res.json({
    success: true,
    role: "user",
    user,
    token: "mock-user-token"
  });
});

// NGO LOGIN (mock)
router.post("/ngo-login", (req, res) => {
  res.json({
    success: true,
    role: "ngo",
    token: "mock-ngo-token"
  });
});

module.exports = router;

// TODO: Replace with real authentication + JWT
