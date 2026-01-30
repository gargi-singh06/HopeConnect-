const express = require("express");
const path = require("path");
const router = express.Router();

const ngos = require(
  path.join(__dirname, "..", "data", "ngos.json")
);

router.get("/", (req, res) => {
  res.json(ngos);
});

router.get("/:id", (req, res) => {
  const ngo = ngos.find(n => n.id == req.params.id);
  res.json(ngo);
});

module.exports = router;
