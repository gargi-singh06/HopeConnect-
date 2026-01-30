const express = require("express");
const router = express.Router();

const users = require("../data/users.json");

router.get("/:id/dashboard", (req, res) => {
  const user = users.find(u => u.id == req.params.id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({
    donations: user.donations,
    volunteerApplications: user.volunteerApplications
  });
});

module.exports = router;
