const express = require("express");
const db = require("../data/dbHelpers");
const router = express.Router();
const helpers = require("./helpers");

const prettifyArray = helpers.prettifyArray;
const prettifyProjectWithActions = helpers.prettifyProjectWithActions;

router
  .route("/")
  .get(async (req, res) => {
    try {
      const actions = await db.getActions();
      const prettierActions = prettifyArray(actions);
      res.status(200).json(prettierActions);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Sorry, we couldn't get the actions at this time" });
    }
  })
  .post(async (req, res) => {
    const { description, notes, project_id } = req.body;
    if (!description || !notes || !project_id)
      return res.status(400).json({
        error: "A new project must include a description, notes and project_id"
      });
    try {
      const projectAtId = await db.findProjectByIdSimple(project_id).first();
      if (!projectAtId)
        return res
          .status(400)
          .json({ error: "You can only add actions to an existing project" });
      const newActionId = await db.addAction(req.body);
      // lets return the whole project we just added the info to in the pretty format
      const projectWithActions = await db.findProjectById(project_id);
      const prettierProject = prettifyProjectWithActions(projectWithActions);
      res.status(201).json(prettierProject);
    } catch (error) {
      res.status(500).json({ error: "We could not at an action at this time" });
    }
  });

module.exports = router;
