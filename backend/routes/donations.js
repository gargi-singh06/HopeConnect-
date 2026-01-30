const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  res.json({
    status: "success",
    message: "Donation recorded (mock)",
  });
});

module.exports = router;

// TODO: Integrate Razorpay & DB storage
