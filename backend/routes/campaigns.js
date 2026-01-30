const express = require("express");
const path = require("path");
const router = express.Router();

// ✅ SAFE absolute path resolution
const campaigns = require(
  path.join(__dirname, "..", "data", "campaigns.json")
);

// Get campaigns by NGO ID
router.get("/ngo/:ngoId", (req, res) => {
  const filtered = campaigns.filter(
    c => c.ngoId == req.params.ngoId
  );
  res.json(filtered);
});

module.exports = router;
