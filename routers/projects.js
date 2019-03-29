const express = require("express");
const db = require("../data/dbHelpers");
const router = express.Router();

router.route("/").get(async (req, res) => {
  try {
    const projects = await db.findProjects();
    res.status(200).json(projects);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Sorry we couldn't get the projects at this time" });
  }
});

module.exports = router;
