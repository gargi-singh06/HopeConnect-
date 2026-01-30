const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  res.json({
    status: "success",
    message: "Volunteer registered (mock)",
  });
});

module.exports = router;

// TODO: POST /api/volunteers
